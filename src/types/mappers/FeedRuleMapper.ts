import type {FeedRule as QbitFeedRule} from '@/types/qbit/models'
import type {FeedRule as VtFeedRule} from '@/types/vuetorrent'
import type {BaseMapper} from "@/types/mappers/index";

export default class FeedRuleMapper implements BaseMapper<QbitFeedRule, VtFeedRule> {
  public toQbit(rule: VtFeedRule): QbitFeedRule {
    return <QbitFeedRule>{
      addPaused: rule.addPaused,
      affectedFeeds: rule.affectedFeeds,
      assignedCategory: rule.assignedCategory,
      enabled: rule.enabled,
      episodeFilter: rule.episodeFilter,
      ignoreDays: rule.ignoreDays,
      lastMatch: rule.lastMatch,
      mustContain: rule.mustContain,
      mustNotContain: rule.mustNotContain,
      savePath: rule.savePath,
      smartFilter: rule.smartFilter,
      useRegex: rule.useRegex
    }
  }

  public toVt(rule: QbitFeedRule): VtFeedRule {
    return <VtFeedRule>{
      addPaused: rule.addPaused,
      affectedFeeds: rule.affectedFeeds,
      assignedCategory: rule.assignedCategory,
      enabled: rule.enabled,
      episodeFilter: rule.episodeFilter,
      ignoreDays: rule.ignoreDays,
      lastMatch: rule.lastMatch,
      mustContain: rule.mustContain,
      mustNotContain: rule.mustNotContain,
      savePath: rule.savePath,
      smartFilter: rule.smartFilter,
      useRegex: rule.useRegex
    }
  }
}