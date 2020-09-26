
import React from "react";
import PropTypes from "prop-types";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { ChartCanvas, Chart } from "react-stockcharts";
import {
	BarSeries,
	CandlestickSeries,
	LineSeries,
	ScatterSeries,
	CircleMarker,
} from "react-stockcharts/lib/series";
import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY,
} from "react-stockcharts/lib/coordinates";
import {
	OHLCTooltip,
} from "react-stockcharts/lib/tooltip";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

class CandleStickStockScaleChartWithVolumeBarV2 extends React.Component {
	render() {
		const { type, data: initialData, width, ratio } = this.props;

		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => { 
				const date = new Date(d.datetime);
				return date;
			});
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);

		const start = xAccessor(last(data));
		const end = xAccessor(data[Math.max(0, data.length - 100)]);
		const xExtents = [start, end];

		return (
			<ChartCanvas height={400}
				ratio={ratio}
				width={width}
				margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
			>

				<Chart id={1} yExtents={d => [d.high, d.low]}>
					<XAxis axisAt="bottom" orient="bottom"/>
					<YAxis axisAt="right" orient="right" ticks={5} />
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")} />
					<MouseCoordinateY
						at="right"
						orient="right"
						displayFormat={format(".2f")} />

					<CandlestickSeries />
				</Chart>
				<Chart id={2} origin={(w, h) => [0, h - 150]} height={150} yExtents={d => d.volume}>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={format(".2s")}/>
					<BarSeries yAccessor={d => d.volume} fill={(d) => d.close > d.open ? "#6BA583" : "red"} />
				</Chart>
				<Chart id={3} yExtents={d => [(d.high + d.low)/2,  d.AAPLClose, d.GEClose]}>
					<LineSeries
						yAccessor={d => d.close}
						strokeDasharray="" />
					<ScatterSeries
						yAccessor={d => d.close}
						marker={CircleMarker}
						markerProps={{ r: 3 }} />
					{/* <OHLCTooltip forChart={1} origin={[-40, 0]}/> */}
					{/* <CandlestickSeries /> */}
				</Chart>
				<CrossHairCursor />
			</ChartCanvas>
		);
	}
}

CandleStickStockScaleChartWithVolumeBarV2.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickStockScaleChartWithVolumeBarV2.defaultProps = {
	type: "svg",
};
CandleStickStockScaleChartWithVolumeBarV2 = fitWidth(CandleStickStockScaleChartWithVolumeBarV2);

export default CandleStickStockScaleChartWithVolumeBarV2;
