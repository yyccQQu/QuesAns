//// 使用 Mock
import Mock from 'mockjs'

Mock.mock('http://mockjs.com/dist/mock', {
    'name': '@name()',
    'age|1-100': 100,
    'color': '@color'
});