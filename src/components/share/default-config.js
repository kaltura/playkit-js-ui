const defaultConfig = [
  {
    name: 'facebook',
    templateUrl: 'https://www.facebook.com/sharer/sharer.php?u={shareUrl}',
    title: 'share.share-on-facebook',
    ariaLabel: 'share.share-on-facebook',
    iconType: 'default',
    svg: ''
  },
  {
    name: 'linkedin',
    templateUrl: 'https://www.linkedin.com/shareArticle?mini=true&url={shareUrl}',
    title: 'share.share-on-linkedin',
    ariaLabel: 'share.share-on-linkedin',
    iconType: 'default',
    svg: ''
  },
  {
    name: 'twitter',
    templateUrl: 'https://twitter.com/share?url={shareUrl}',
    title: 'share.share-on-twitter',
    ariaLabel: 'share.share-on-twitter',
    iconType: 'default',
    svg: ''
  }
];

export {defaultConfig};
