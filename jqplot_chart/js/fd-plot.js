var tab_contents = [
    ['那斯達克', 'S&P 500', '道瓊工業'],
    ['歐洲', '英國', '德國', '法國', '荷蘭'],
    ['MSCI亞太', '台灣加權', '上海綜合', '香港恆生', '日經225', '韓國綜合', '印度'],
    ['MSCI新興拉美', '墨西哥', '巴西', '智利'],
    ['MSCI世界', 'MSCI新興市場', '澳洲', '新加坡', '印尼', '南非', '俄羅斯']
];

function initChartArea(arrData, linePoints) {
    // 目前 sub_item 最多為 7 
    // 製作 clone_模型
    for (var i = 1; i < 7; i++) {
        $('#t-chart-clone > .chart-area-btn[data-id="0"]').clone().attr('data-id', i).insertBefore('#t-chart-clone > .area-content');
    }

    // 將 clone_模型 產生到各 Tab_content 去
    for (var i = 0; i < tab_contents.length; i++) {
        $('#t-chart-clone').clone().attr('id', 't-chart-area' + i).attr('data-id', i).appendTo('#fd-plot');
        $('#t-chart-area' + i + ' > .area-content').attr('id', 't-chart' + i);
        for (var j = 0; j < 7; j++) {
            if (j < tab_contents[i].length) {
                $('#t-chart-area' + i + ' > .chart-area-btn[data-id="' + j + '"] > .chart-area-p').text(tab_contents[i][j]);
            } else {
                $('#t-chart-area' + i + ' > .chart-area-btn[data-id="' + j + '"]').remove();
            }
        }
    }
    // 移除 clone_模型
    $('#t-chart-clone').remove();

    // 初始化 jQuery ui tab
    $('#fd-plot').tabs();
    // highlight Tab_content btn
    $('.t-chart > .chart-area-btn[data-id="0"]').addClass('default-active');
    $('.chart-area-btn.default-active').addClass('active');

    if ($('#fd-plot').width() < 250) {
        // 寬度太窄有個資訊在表格上隱藏
        $('.chart-area-btn > .rate').css('display', 'none');
        $('.chart-area-btn > .i-value').css('margin-right', '5px');
    }
    if ($('#fd-plot').width() < 160) {
        // 寬度太窄有個資訊在表格上隱藏
        $('.chart-area-btn > .interest').css('display', 'none');
        $('.chart-area-btn > .i-value').css('margin-right', '2px');
    }

    var minValue = 4495;
    var maxValue = 4528;
    addChart('t-chart0', arrData, '美國-(那斯達克)', minValue, maxValue, linePoints);
}

function addChart(chartId, arrData, chartTitle, minValue, maxValue, linePoints) {

    $.jqplot._noToImageButton = true;

    var chartData = arrData;

    var plot = $.jqplot(chartId, [chartData, linePoints], {
        seriesColors: ['#006699', '#e62117'],
        title: '<p style="font-size: 14px;">' + chartTitle + '</p>',
        highlighter: {
            show: true,
            sizeAdjust: 5,
            tooltipOffset: 5
        },
        grid: {
            background: '#fff',
            drawBorder: true,
            borderColor: '#ddd',
            shadow: false,
            gridLineColor: '#eee',
            gridLineWidth: 1,
            drawGridlines: true
        },
        legend: {
            show: false,
            placement: 'outside'
        },
        seriesDefaults: {
            rendererOptions: {
                smooth: false,
                animation: {
                    show: false
                }
            },
            yaxis: 'y2axis',
            showMarker: false
        },
        series: [{
            fill: false,
            label: '2016'
        }, {
            lineWidth: 1,
            linePattern: 'dashed'
        }],
        axesDefaults: {
            rendererOptions: {
                baselineWidth: 1.5,
                baselineColor: '#444444',
                drawBaseline: false
            }
        },
        axes: {
            xaxis: {
                renderer: $.jqplot.DateAxisRenderer,
                tickRenderer: $.jqplot.CanvasAxisTickRenderer,
                tickOptions: {
                    formatString: "%H",
                    angle: 0,
                    textColor: '#777',
                    fontFamily: 'Tahoma'
                },
                min: "2016-08-16 10:00:00",
                max: "2016-08-16 16:00:00",
                tickInterval: "1 hours",
                drawMajorGridlines: true
            },
            y2axis: {
                renderer: $.jqplot.LogAxisRenderer,
                pad: 0,
                rendererOptions: {
                    minorTicks: 1
                },
                min: minValue - 20,
                max: maxValue + 20,
                // numberTicks: 5,
                tickOptions: {
                    // formatString: "$%'d",
                    formatString: "%'d",
                    // prefix: '$',
                    // textColor: '#777',
                    fontFamily: 'Tahoma',
                    showMark: false
                },
                drawMajorGridlines: true
            }
        },
        cursor: {
            show: true
        }
    });

    $('.jqplot-highlighter-tooltip').addClass('ui-corner-all');
    $('#' + chartId).width($('#fd-plot').width()).height(200);
    plot.replot();

    $(window).resize(function(e) {
        e.stopPropagation();
        $('#' + chartId).width($('#fd-plot').width());
        plot.replot();
    });
}

function getLinePointsByYValue(yValue, periodStart, periodEnd) {

    var linePoints = [];

    linePoints.push([periodStart, yValue]);
    linePoints.push([periodEnd, yValue]);

    return linePoints;
}

$(document).ready(function() {

    var perday = [
        ["2016-08-16 10:56", 4494.71],
        ["2016-08-16 10:59", 4510.38],
        ["2016-08-16 12:30", 4528.25],
        ["2016-08-16 12:50", 4499.25],
        ["2016-08-16 13:16", 4510.9],
        ["2016-08-16 13:56", 4513.9],
        ["2016-08-16 14:13", 4495.24],
        ["2016-08-16 14:33", 4499.24],
        ["2016-08-16 14:25", 4520.18],
        ["2016-08-16 14:55", 4522.18],
        ["2016-08-16 15:24", 4498.73],
        ["2016-08-16 15:34", 4493.73],
        ["2016-08-16 15:43", 4518.91],
        ["2016-08-16 15:53", 4522.91],
        ["2016-08-16 15:59", 4518.27],
        ["2016-08-16 16:00", 4527.82],
    ];

    var perday1 = [
        ["2016-08-16 10:56", 4527.71],
        ["2016-08-16 10:59", 4518.38],
        ["2016-08-16 12:30", 4522.25],
        ["2016-08-16 12:50", 4518.25],
        ["2016-08-16 13:16", 4493.9],
        ["2016-08-16 13:56", 4522.9],
        ["2016-08-16 14:13", 4495.24],
        ["2016-08-16 14:33", 4520.24],
        ["2016-08-16 14:25", 4520.18],
        ["2016-08-16 14:55", 4495.18],
        ["2016-08-16 15:24", 4510.73],
        ["2016-08-16 15:34", 4493.73],
        ["2016-08-16 15:43", 4514.91],
        ["2016-08-16 15:53", 4522.91],
        ["2016-08-16 15:59", 4528.27],
        ["2016-08-16 16:00", 4510.82],
    ];

    // for getLinePointsByYValue func
    var linePointsValue = 4520;
    var periodStart = "2016-08-16 10:00";
    var periodEnd = "2016-08-16 16:00";
    var linePoints = getLinePointsByYValue(linePointsValue, periodStart, periodEnd);

    initChartArea(perday, linePoints);

    $('#fd-plot > ul.chart-tabs > li').click(function() {
        // $('#t-chart').empty();
        $('.chart-area-btn').removeClass('active');
        $('.chart-area-btn.default-active').addClass('active');

        var suffix = ['那斯達克', '歐洲', 'MSCI亞太', 'MSCI新興拉美', 'MSCI世界'];
        var dataId = $(this).attr('data-id');
        var minValue = 4495;
        var maxValue = 4528;

        // for getLinePointsByYValue func
        var linePointsValue = 4520;
        var periodStart = '2016-08-16 10:00';
        var periodEnd = '2016-08-16 16:00';
        var linePoints = getLinePointsByYValue(linePointsValue, periodStart, periodEnd);

        switch (dataId) {
            case '0':
                addChart('t-chart0', perday, '美國-(' + suffix[0] + ')', minValue, maxValue, linePoints);
                break;
            case '1':
                var minValue = 4485;
                var maxValue = 4538;
                addChart('t-chart1', perday1, '歐洲-(' + suffix[1] + ')', minValue, maxValue, linePoints);
                break;
            case '2':
                addChart('t-chart2', perday, '亞洲-(' + suffix[2] + ')', minValue, maxValue, linePoints);
                break;
            case '3':
                addChart('t-chart3', perday, '拉美-(' + suffix[3] + ')', minValue, maxValue, linePoints);
                break;
            case '4':
                addChart('t-chart4', perday, '其他-(' + suffix[4] + ')', minValue, maxValue, linePoints);
                break;
            default:
                addChart('t-chart4', perday, '美國-(' + suffix[0] + ')', minValue, maxValue, linePoints);
        }
    });

    // $('.chart-area-btn').click(function() {
    $('.chart-area-btn').bind('click mouseenter', function(e) {
        $('.chart-area-btn').removeClass('active');
        $(this).addClass('active');
        var dataId = $(this).parent().attr('data-id');
        var minValue = 4495;
        var maxValue = 4528;
        var suffix = $(this).find('.chart-area-p').text();

        // for getLinePointsByYValue func
        var linePointsValue = 4520;
        var periodStart = '2016-08-16 10:00';
        var periodEnd = '2016-08-16 16:00';
        var linePoints = getLinePointsByYValue(linePointsValue, periodStart, periodEnd);

        switch (dataId) {
            case '0':
                addChart('t-chart0', perday, '美國-(' + suffix + ')', minValue, maxValue, linePoints);
                break;
            case '1':
                var minValue = 4485;
                var maxValue = 4538;
                addChart('t-chart1', perday1, '歐洲-(' + suffix + ')', minValue, maxValue, linePoints);
                break;
            case '2':
                addChart('t-chart2', perday, '亞洲-(' + suffix + ')', minValue, maxValue, linePoints);
                break;
            case '3':
                addChart('t-chart3', perday, '拉美-(' + suffix + ')', minValue, maxValue, linePoints);
                break;
            case '4':
                addChart('t-chart4', perday, '其他-(' + suffix + ')', minValue, maxValue, linePoints);
                break;
            default:
                addChart('t-chart0', perday, '美國-(' + suffix + ')', minValue, maxValue, linePoints);
        }
    });
});
