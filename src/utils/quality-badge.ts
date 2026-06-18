export type QualityBadgeType =
  | 'qualityHd'
  | 'qualityHdActive'
  | 'quality4k'
  | 'quality4kActive'
  | 'quality8k'
  | 'quality8kActive'
  | null
  | undefined;

export const getQualityBadgeText = (badgeType: QualityBadgeType): string => {
  switch (badgeType) {
    case 'qualityHd':
    case 'qualityHdActive':
      return 'HD';
    case 'quality4k':
    case 'quality4kActive':
      return '4K';
    case 'quality8k':
    case 'quality8kActive':
      return '8K';
    default:
      return '';
  }
};