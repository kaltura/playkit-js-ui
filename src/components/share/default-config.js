const defaultConfig = [
  {
    name: 'facebook',
    templateUrl: 'https://www.facebook.com/sharer/sharer.php?u={shareUrl}',
    title: 'Share on Facebook',
    ariaLabel: 'Share on Facebook',
    iconType: 'default',
    svg: ''
  },
  {
    name: 'linkedin',
    templateUrl: 'https://www.linkedin.com/shareArticle?mini=true&url={shareUrl}',
    title: 'Share on Linkedin',
    ariaLabel: 'Share on Linkedin',
    iconType: 'default',
    svg: ''
  },
  {
    name: 'twitter',
    templateUrl: 'https://twitter.com/share?url={shareUrl}',
    title: 'Share on Twitter',
    ariaLabel: 'Share on Twitter',
    iconType: 'default',
    svg: ''
  }
];

export {defaultConfig};
