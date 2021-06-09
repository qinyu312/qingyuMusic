import {AxiosInstance} from './Intercept';

let base = 'https://autumnfish.cn/'

// let _axios = AxiosInstance(false);
let _instance = AxiosInstance(true);


// 封装get post请求
// 轮播图
export const getBanner = params => { return _instance.get(`${base}/banner`, {"params":params}).then(res => res.data); };
// 推荐歌单
export const getSongList = params => { return _instance.get(`${base}/personalized`, {"params":params}).then(res => res.data); };
// 最新歌曲
export const getNewSong = params => { return _instance.get(`${base}/personalized/newsong`, {"params":params}).then(res => res.data); };
// 播放音乐
export const playSong = params => { return _instance.get(`${base}/song/url`, {"params":params}).then(res => res.data); };
// 获取MV
export const getMv = params => { return _instance.get(`${base}/personalized/mv`, {"params":params}).then(res => res.data); };

// 日推歌单
export const songList = params => { return _instance.get(`${base}/top/playlist/highquality`, {"params":params}).then(res => res.data); };
// 歌单列表
export const getPlayList = params => { return _instance.get(`${base}/top/playlist`, {"params":params}).then(res => res.data); };

// 最新音乐
export const newSong = params => { return _instance.get(`${base}/top/song`, {"params":params}).then(res => res.data); };

// Mv
export const mvAll = params => { return _instance.get(`${base}/mv/all`, {"params":params}).then(res => res.data); };

// 搜索歌曲
export const search = params => { return _instance.get(`${base}/search`, {"params":params}).then(res => res.data); };

// 歌单详情
export const playSongInfo = params => { return _instance.get(`${base}/playlist/detail`, {"params":params}).then(res => res.data); };
// 热门评论
export const hotSay = params => { return _instance.get(`${base}/comment/hot`, {"params":params}).then(res => res.data); };