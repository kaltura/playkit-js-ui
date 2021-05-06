const defaultConfig = [
  {
    name: 'facebook',
    templateUrl: 'https://www.facebook.com/sharer/sharer.php?u={shareUrl}',
    title: 'share.facebook',
    ariaLabel: 'share.facebook',
    iconType: 'default',
    svg: ''
  },
  {
    name: 'linkedin',
    templateUrl: 'https://www.linkedin.com/shareArticle?mini=true&url={shareUrl}',
    title: 'share.linkedin',
    ariaLabel: 'share.linkedin',
    iconType: 'default',
    svg: ''
  },
  {
    name: 'twitter',
    templateUrl: 'https://twitter.com/share?url={shareUrl}',
    title: 'share.twitter',
    ariaLabel: 'share.twitter',
    iconType: 'default',
    svg: ''
  }
];

export {defaultConfig};
