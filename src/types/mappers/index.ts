import FeedRuleMapper from "./FeedRuleMapper"
import TrackerMapper from "./TrackerMapper"

export {FeedRuleMapper, TrackerMapper}

export interface BaseMapper<QbitType, VtType> {
  toVt(data: QbitType): VtType
  toQbit(data: VtType): QbitType
}
