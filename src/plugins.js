/*
  Useful note:
    Ticks.Translation[0]: tick's start posttion on x axis.
    Ticks.Translation[1]: tick's start posttion on y axis.
*/

export const underLinePlugin = {
  id: 'underline',
  afterDraw: (chart, args, opts) => {
    const { ctx } = chart;
    const barWidth = chart.getDatasetMeta(0).data[0].width;

    ctx.save();
    chart.scales.x._labelItems.forEach((tickItem, index) => {
      if (opts.effectRange !== null || opts.effectRange !== undefined) {
        if (opts.effectRange.indexOf(tickItem.label) > -1) {
          let xPos = tickItem.translation[0];
          let yPos = tickItem.translation[1];

          ctx.strokeStyle = opts.lineColor || 'blue';
          ctx.lineWidth = opts.lineWidth || 1;

          ctx.beginPath();
          ctx.moveTo(xPos - barWidth / 2, yPos + (opts.yOffset || 0));
          ctx.lineTo(xPos + barWidth / 2, yPos + (opts.yOffset || 0));
          ctx.stroke();
        }
      }
    });
    ctx.restore();
  },
};

export const roundUnderlinePlugin = {
  id: 'roundUnderline',
  afterDraw: (chart, args, opts) => {
    const { ctx } = chart;
    const barWidth = chart.getDatasetMeta(0).data[0].width;

    ctx.save();
    chart.scales.x._labelItems.forEach((tickItem, index) => {
      if (opts.effectRange !== null || opts.effectRange !== undefined) {
        if (opts.effectRange.indexOf(tickItem.label) > -1) {
          let xPos = tickItem.translation[0];
          let yPos = tickItem.translation[1];

          ctx.strokeStyle = opts.lineColor || 'blue';
          ctx.fillStyle = opts.lineColor || 'blue';

          ctx.beginPath();
          ctx.roundRect(
            xPos - barWidth / 2,
            yPos + (opts.yOffset || 0),
            barWidth,
            opts.lineWidth || 1,
            20
          );
          ctx.fill();
          ctx.stroke();
        }
      }
    });
    ctx.restore();
  },
};

export const redDotHighlightPlugin = {
  id: 'redDot',
  afterDraw: (chart, args, opts) => {
    const { ctx } = chart;
    const barWidth = chart.getDatasetMeta(0).data[0].width;

    ctx.save();
    chart.scales.x._labelItems.forEach((tickItem, index) => {
      if (opts.effectRange !== null || opts.effectRange !== undefined) {
        if (opts.effectRange.indexOf(tickItem.label) > -1) {
          let xPos = tickItem.translation[0];
          let yPos = tickItem.translation[1];
          let roundSize = opts.roundSize || 5;

          ctx.strokeStyle = opts.dotColor || 'blue';
          ctx.fillStyle = opts.dotColor || 'blue';

          ctx.beginPath();
          ctx.roundRect(
            xPos + barWidth / 3,
            yPos + (opts.yOffset || 0),
            roundSize,
            roundSize,
            100
          );
          ctx.fill();
          ctx.stroke();
        }
      }
    });
    ctx.restore();
  },
};

export const extendLegendBottomPadding = {
  id: 'legendBottomPadding',
  beforeInit: function (chart, args, options) {
    chart.legend.afterFit = function () {
      this.height = this.height + options.size;
    };
  },
};

export const subLabel = {
  id: 'subLabel',
  afterDataSetDraw: function (chart, args, options) {
    const {
      ctx,
      chartArea: { left, bottom, width },
    } = chart;
    const barWidth = chart.getDatasetMeta(0).data[0].width;
    ctx.save();

    for (let i = 0; i < options.labels.length; i++) {
      drawSubLabelText(
        options.labels[i],
        (width / barWidth) * options.width[i]
      );
    }

    function drawSubLabelText(text, x) {
      ctx.font = 'bolder 12px sans-serif';
      ctx.fillStyle = 'rgba(102, 102, 102, 1)';
      ctx.textAlign = 'center';
      ctx.fillText(text, x + left, bottom + 40);
    }
  },
};
