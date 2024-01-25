# Logo

Component that renders a logo image in the bottom bar area

## Props

| Prop | Description       |
|------|-------------------|
| img  | The image url     |
| text | Text for tooltip  |
| link | The logo url link |

## Configuration

> > ### img
> >
> > ##### Type: `string | undefined`
> >
> > ##### Default: `-`
> >
> > ##### Description: Defines logo image url.
>
> > ### text
> >
> > ##### Type: `string | undefined`
> >
> > ##### Default: `-`
> >
> > ##### Description: Defines logo tooltip text.
>
> > ### link
> >
> > ##### Type: `string | undefined`
> >
> > ##### Default: `-`
> >
> > ##### Description: Defines logo image link url.
>


## Player configuration

> This guide assumes you are using the [Kaltura Player]

[kaltura player]: https://github.com/kaltura/kaltura-player-js/

In order to override error-overlay background add `backgroundUrl` link to player config

```js
const config = {
    ...
    ui: {
        components: {
            logo: {
                img: "https://custom-logo-image-url",
                url: "https://custom-logo-link-url",
                text: 'Logo text'
            }
        }
    }
    ...
}

const player = KalturaPlayer.setup(config);
```
