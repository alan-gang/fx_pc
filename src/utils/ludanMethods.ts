import { LOTTERY_TYPES } from './config';

export const methods: Map<string, LudanMethod> = new Map();
methods.set('ssc_zh_dx', {id: '1', title: '总和大小', methodId: '1251', method: 'zh_dx', type: LOTTERY_TYPES.SSC});
methods.set('ssc_zh_ds', {id: '2', title: '总和单双', methodId: '1251', method: 'zh_ds', type: LOTTERY_TYPES.SSC});
methods.set('ssc_wg_lhh', {id: '3', title: '万个龙虎和', methodId: '1200', method: 'wg_lhh', type: LOTTERY_TYPES.SSC});
methods.set('ssc_ww_dx', {id: '4', title: '万位大小', methodId: '1250', method: 'ww_dx', type: LOTTERY_TYPES.SSC, pos: 0});
methods.set('ssc_ww_ds', {id: '5', title: '万位单双', methodId: '1250', method: 'ww_ds', type: LOTTERY_TYPES.SSC, pos: 0});
methods.set('ssc_qw_dx', {id: '6', title: '千位大小', methodId: '1250', method: 'qw_dx', type: LOTTERY_TYPES.SSC, pos: 1});
methods.set('ssc_qw_ds', {id: '7', title: '千位单双', methodId: '1250', method: 'qw_ds', type: LOTTERY_TYPES.SSC, pos: 1});
methods.set('ssc_bw_dx', {id: '8', title: '百位大小', methodId: '1250', method: 'bw_dx', type: LOTTERY_TYPES.SSC, pos: 2});
methods.set('ssc_bw_ds', {id: '9', title: '百位单双', methodId: '1250', method: 'bw_ds', type: LOTTERY_TYPES.SSC, pos: 2});
methods.set('ssc_sw_dx', {id: '10', title: '十位大小', methodId: '1250', method: 'sw_dx', type: LOTTERY_TYPES.SSC, pos: 3});
methods.set('ssc_sw_ds', {id: '11', title: '十位单双', methodId: '1250', method: 'sw_ds', type: LOTTERY_TYPES.SSC, pos: 3});
methods.set('ssc_gw_dx', {id: '12', title: '个位大小', methodId: '1250', method: 'gw_dx', type: LOTTERY_TYPES.SSC, pos: 4});
methods.set('ssc_gw_ds', {id: '13', title: '个位单双', methodId: '1250', method: 'gw_ds', type: LOTTERY_TYPES.SSC, pos: 4});

methods.set('11x5_zh_dx', {id: '50', title: '总和大小', methodId: '2050', method: 'zh_dx', type: LOTTERY_TYPES.G11X5});
methods.set('11x5_zh_ds', {id: '51', title: '总和单双', methodId: '2050', method: 'zh_ds', type: LOTTERY_TYPES.G11X5});
methods.set('11x5_zhw_wsdx', {id: '52', title: '总和尾大小', methodId: '2050', method: 'zhw_wsdx', type: LOTTERY_TYPES.G11X5});
methods.set('11x5_zhw_wsds', {id: '53', title: '总和尾单双', methodId: '2050', method: 'zhw_wsds', type: LOTTERY_TYPES.G11X5});
methods.set('11x5_wg_lhh', {id: '55', title: '龙虎', methodId: '2053', method: 'wg_lhh', type: LOTTERY_TYPES.G11X5});
methods.set('11x5_ww_dx', {id: '56', title: '第一位大小', methodId: '2051', method: 'ww_dx', type: LOTTERY_TYPES.G11X5, pos: 0});
methods.set('11x5_ww_ds', {id: '57', title: '第一位单双', methodId: '2051', method: 'ww_ds', type: LOTTERY_TYPES.G11X5, pos: 0});
methods.set('11x5_qw_dx', {id: '58', title: '第二位大小', methodId: '2051', method: 'qw_dx', type: LOTTERY_TYPES.G11X5, pos: 1});
methods.set('11x5_qw_ds', {id: '59', title: '第二位单双', methodId: '2051', method: 'qw_ds', type: LOTTERY_TYPES.G11X5, pos: 1});
methods.set('11x5_bw_dx', {id: '60', title: '第三位大小', methodId: '2051', method: 'bw_dx', type: LOTTERY_TYPES.G11X5, pos: 2});
methods.set('11x5_bw_ds', {id: '61', title: '第三位单双', methodId: '2051', method: 'bw_ds', type: LOTTERY_TYPES.G11X5, pos: 2});
methods.set('11x5_sw_dx', {id: '62', title: '第四位大小', methodId: '2051', method: 'sw_dx', type: LOTTERY_TYPES.G11X5, pos: 3});
methods.set('11x5_sw_ds', {id: '63', title: '第四位单双', methodId: '2051', method: 'sw_ds', type: LOTTERY_TYPES.G11X5, pos: 3});
methods.set('11x5_gw_dx', {id: '64', title: '第五位大小', methodId: '2051', method: 'gw_dx', type: LOTTERY_TYPES.G11X5, pos: 4});
methods.set('11x5_gw_ds', {id: '65', title: '第五位单双', methodId: '2051', method: 'gw_ds', type: LOTTERY_TYPES.G11X5, pos: 4});

methods.set('pk10_zh_dx', {id: '100', title: '冠亚和大小', methodId: '4050', method: 'zh_dx', type: LOTTERY_TYPES.PK10});
methods.set('pk10_zh_ds', {id: '101', title: '冠亚和单双', methodId: '4050', method: 'zh_ds', type: LOTTERY_TYPES.PK10});
methods.set('pk10_ww_dx', {id: '102', title: '冠军大小', methodId: '4053', method: 'ww_dx', type: LOTTERY_TYPES.PK10, pos: 0});
methods.set('pk10_ww_ds', {id: '103', title: '冠军单双', methodId: '4053', method: 'ww_ds', type: LOTTERY_TYPES.PK10, pos: 0});
methods.set('pk10_qw_dx', {id: '104', title: '亚军大小', methodId: '4053', method: 'qw_dx', type: LOTTERY_TYPES.PK10, pos: 1});
methods.set('pk10_qw_ds', {id: '105', title: '亚军单双', methodId: '4053', method: 'qw_ds', type: LOTTERY_TYPES.PK10, pos: 1});
methods.set('pk10_bw_dx', {id: '106', title: '季军大小', methodId: '4053', method: 'bw_dx', type: LOTTERY_TYPES.PK10, pos: 2});
methods.set('pk10_bw_ds', {id: '107', title: '季军单双', methodId: '4053', method: 'bw_ds', type: LOTTERY_TYPES.PK10, pos: 2});
methods.set('pk10_sw_dx', {id: '108', title: '第四位大小', methodId: '4053', method: 'sw_dx', type: LOTTERY_TYPES.PK10, pos: 3});
methods.set('pk10_sw_ds', {id: '109', title: '第四位单双', methodId: '4053', method: 'sw_ds', type: LOTTERY_TYPES.PK10, pos: 3});
methods.set('pk10_gw_dx', {id: '110', title: '第五位大小', methodId: '4053', method: 'gw_dx', type: LOTTERY_TYPES.PK10, pos: 4});
methods.set('pk10_gw_ds', {id: '111', title: '第五位单双', methodId: '4053', method: 'gw_ds', type: LOTTERY_TYPES.PK10, pos: 4});

methods.set('k3_zh_dx', {id: '200', title: '大小', methodId: '5018', method: 'zh_dx', type: LOTTERY_TYPES.K3});
methods.set('k3_zh_ds', {id: '201', title: '单双', methodId: '5018', method: 'zh_ds', type: LOTTERY_TYPES.K3});