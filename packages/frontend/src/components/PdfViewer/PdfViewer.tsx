import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/zoom/lib/styles/index.css";
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  CharacterMap,
  LayerRenderStatus,
  PageChangeEvent,
  Plugin,
  PluginOnCanvasLayerRender,
  SpecialZoomLevel,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { zoomPlugin } from "@react-pdf-viewer/zoom";

import { PositionType } from "../../constants/enums";
import { COLOR_PRIMARY } from "../../themes/colors";
import { useWindowSize } from "../../utils/customHooks";
import {
  ControlContainer,
  DetailsContainer,
  ErrorMessage,
  ErrorMessageContainer,
  GridItem,
  Text,
  ViewerContainer,
} from "./styles";

import type { ExtractedResultScore, Position } from "../../types";

interface PdfViewerProps {
  extracted_result_score: ExtractedResultScore;
  currentExtractedResultIndex: number;
  setCurrentExtractedResultIndex: Function;
}

interface ExtractedArea {
  pageIndex: number;
  points: number[];
  positionType: string;
}

enum HighlightColors {
  Label = "rgb(122, 153, 248, 0.2)",
  Unit = "rgb(157, 206, 114, 0.2)",
  Disclosure = "rgb(255, 166, 166, 0.2)",
}
const PdfViewer = (props: PdfViewerProps) => {
  const containerRef = useRef(null);
  const { extracted_result_score, currentExtractedResultIndex } = props;
  const [extractedAreas, setExtractedAreas] = useState<ExtractedArea[]>([]);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const { t } = useTranslation();

  const zoomPluginInstance = zoomPlugin({ enableShortcuts: true });
  const { ZoomInButton, ZoomOutButton, ZoomPopover } = zoomPluginInstance;

  const pageNavigationPluginInstance = pageNavigationPlugin();
  const {
    CurrentPageInput,
    GoToFirstPageButton,
    GoToLastPageButton,
    GoToNextPageButton,
    GoToPreviousPage,
    jumpToPage,
  } = pageNavigationPluginInstance;

  const parsePosition = (positionString: string) => {
    let position = {};
    if (positionString !== "") {
      position = positionString;
    }
    return position as Position;
  };

  const windowSize = useWindowSize();

  useEffect(() => {
    const data = [];
    if (extracted_result_score.extracted_result_pages) {
      for (
        let i = 0;
        i < extracted_result_score.extracted_result_pages.length;
        i += 1
      ) {
        const pageObject = extracted_result_score.extracted_result_pages[i];
        const { page } = pageObject;

        if (pageObject.extracted_result_positions.length) {
          const extracted_data = pageObject.extracted_result_positions
            .filter((position) => position.position && position.position !== "")
            .map((position) => {
              const { left, top, right, bottom } = parsePosition(
                position.position
              );
              return {
                // pageIndex is zero-based while page from source is one-based so we minus one
                pageIndex: page - 1,
                // left and top are the coordinates for the first corner of the rectangle
                // right and bottom are the coordinates for the third corner of the rectangle
                points: [left, top, right, bottom],
                copiedPositionType: position.copied_position_type,
              };
            });
          for (let j = 0; j < extracted_data.length; j += 1) {
            data.push(extracted_data[j]);
          }
        }
      }
    }
    setExtractedAreas(data);
  }, [extracted_result_score]);

  const navigationPages = useMemo(() => {
    // Show all previous page numbers if user's seeing the last result, else show all next page number
    let pages = extractedAreas.map((area) =>
      area?.pageIndex != null
        ? `${t("company:pdf_viewer.page")} ${area.pageIndex + 1}`
        : ""
    );
    pages = Array.from(new Set(pages)).filter(
      (_, index) => index !== currentExtractedResultIndex
    );
    return pages.join(", ");
  }, [extractedAreas, currentExtractedResultIndex]);

  const navigationPagesList = useMemo(() => {
    // Show all previous page numbers if user's seeing the last result, else show all next page number
    let pages = extractedAreas.map((area) =>
      area?.pageIndex != null ? area.pageIndex + 1 : ""
    );
    pages = Array.from(new Set(pages));
    return pages;
  }, [extractedAreas]);

  const characterMap: CharacterMap = {
    isCompressed: true,
    // The url has to end with "/"
    url: "https://unpkg.com/pdfjs-dist@2.6.347/cmaps/",
  };

  const documentUrl = useMemo(() => {
    let baseUrl = extracted_result_score.document?.url;
    if (!baseUrl) {
      return baseUrl;
    }
    if (!baseUrl.includes("?")) {
      baseUrl += `?width=${windowSize.width}&height=${windowSize.height}`;
    } else {
      baseUrl += `&width=${windowSize.width}&height=${windowSize.height}`;
    }
    return baseUrl;
  }, [extracted_result_score, windowSize]);

  const workerUrl =
    "https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js";

  const customCanvasPlugin = (data: any): Plugin => {
    const onCanvasLayerRender = (e: PluginOnCanvasLayerRender) => {
      // Return if the canvas isn't rendered completely
      if (e.status !== LayerRenderStatus.DidRender) {
        return;
      }

      // Get the canvas element
      const canvas = e.ele;
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      let heightResizeNumber = 2.22; // When devicePixelRatio is 2.5
      let widthResizeNumber = 2.22; // When devicePixelRatio is 2.5
      heightResizeNumber = (heightResizeNumber * 2.5) / window.devicePixelRatio;
      widthResizeNumber = (widthResizeNumber * 2.5) / window.devicePixelRatio;

      for (let i = 0; i < data.length; i += 1) {
        if (data[i] !== undefined && e.pageIndex === data[i].pageIndex) {
          ctx.beginPath();
          const left = (data[i].points[0] * e.scale) / widthResizeNumber - 5;
          const top = (data[i].points[1] * e.scale) / heightResizeNumber;
          // canvas draws shape based on the coordinates of a point and the size of the shape
          // so we need to do some calculation
          const right =
            ((data[i].points[2] - data[i].points[0]) * e.scale) /
              widthResizeNumber +
            5;
          const bottom =
            ((data[i].points[3] - data[i].points[1]) * e.scale) /
            heightResizeNumber;

          ctx.rect(left * 2, top * 2, right * 2, bottom * 2);

          if (data[i].copiedPositionType === PositionType[PositionType.label]) {
            ctx.fillStyle = HighlightColors.Label;
          } else if (
            data[i].copiedPositionType === PositionType[PositionType.disclosure]
          ) {
            ctx.fillStyle = HighlightColors.Disclosure;
          } else if (
            data[i].copiedPositionType === PositionType[PositionType.unit]
          ) {
            ctx.fillStyle = HighlightColors.Unit;
          }
          ctx.fill();
          ctx.closePath();
        }
      }
    };

    return {
      onCanvasLayerRender,
    };
  };

  const customCanvasPluginInstance = customCanvasPlugin(extractedAreas);

  const onDocumentLoad = () => {
    let page = 1;
    const pageObject = extracted_result_score.extracted_result_pages[0];
    // eslint-disable-next-line prefer-destructuring
    page = pageObject?.page || 1;
    jumpToPage(page - 1);
    setDocumentLoaded(true);
  };

  const onZoom = (_data) => {};

  // const scrollToHighlightedBox = () => {
  //   const container = containerRef.current.children[0].children[0].children[0];
  //   // containerRef = document.querySelector('#container> div> div> div');
  //   container.scrollTo({
  //     left: 100,
  //     top: 800,
  //     behavior: 'smooth',
  //   });
  // };

  const onPageChange = (_event: PageChangeEvent) => {};

  const renderError = () => {
    return (
      <ErrorMessageContainer>
        <ErrorMessage>
          {t("company:pdf_viewer.something_wrong_error_message")}
        </ErrorMessage>
      </ErrorMessageContainer>
    );
  };

  return (
    <>
      <ControlContainer>
        <GoToFirstPageButton />
        <GoToPreviousPage />
        <div>
          <CurrentPageInput />
        </div>
        <GoToNextPageButton />
        <GoToLastPageButton />
        <ZoomOutButton />
        <ZoomPopover />
        <ZoomInButton />
      </ControlContainer>

      <ViewerContainer id="container" ref={containerRef}>
        <Worker workerUrl={workerUrl}>
          {documentUrl && (
            <Viewer
              fileUrl={documentUrl}
              characterMap={characterMap}
              initialPage={0}
              defaultScale={SpecialZoomLevel.PageWidth}
              onDocumentLoad={onDocumentLoad}
              onZoom={onZoom}
              onPageChange={onPageChange}
              renderError={renderError}
              plugins={[
                zoomPluginInstance,
                customCanvasPluginInstance,
                pageNavigationPluginInstance,
              ]}
            />
          )}
        </Worker>
      </ViewerContainer>

      <DetailsContainer>
        <GridItem item xs={12}>
          <Text component="span">
            {t("company:source_view_mode.current_view")}
          </Text>
          <Text component="span" style={{ fontWeight: 700 }}>{`${t(
            "company:pdf_viewer.page"
          )} ${navigationPagesList[currentExtractedResultIndex]}`}</Text>
        </GridItem>

        <GridItem
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <Text
            component="span"
            style={{
              color: COLOR_PRIMARY,
              textTransform: "capitalize",
              fontWeight: 700,
            }}
          >
            {`${currentExtractedResultIndex + 1}/${
              extracted_result_score.extracted_result_pages.length
            } ${t("company:source_view_mode.result")}`}
          </Text>
          <div>
            <IconButton
              disabled={currentExtractedResultIndex === 0 || !documentLoaded}
              onClick={() => {
                jumpToPage(
                  Number(navigationPagesList[currentExtractedResultIndex - 1]) -
                    1
                );
                props.setCurrentExtractedResultIndex(
                  (prevState) => prevState - 1
                );
              }}
              color="primary"
              disableRipple
              style={{ height: 32 }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton
              disabled={
                currentExtractedResultIndex ===
                  extracted_result_score.extracted_result_pages.length - 1 ||
                extracted_result_score.extracted_result_pages.length === 0 ||
                !documentLoaded
              }
              onClick={() => {
                jumpToPage(
                  Number(navigationPagesList[currentExtractedResultIndex + 1]) -
                    1
                );
                props.setCurrentExtractedResultIndex(
                  (prevState) => prevState + 1
                );
              }}
              color="primary"
              disableRipple
              style={{ height: 32 }}
            >
              <NavigateNextIcon />
            </IconButton>
          </div>
        </GridItem>

        <GridItem item xs={12}>
          <Text component="span">
            {t("company:source_view_mode.jump_to_page")}
          </Text>
          <Text component="span" style={{ fontWeight: 700 }}>
            {navigationPages}
          </Text>
        </GridItem>
      </DetailsContainer>
    </>
  );
};

export default React.memo(PdfViewer);
