import { AbrMode } from '@playkit-js/playkit-js';
import { BaseMiddleware } from '@playkit-js/playkit-js';
import { BaseProvider } from '@playkit-js/playkit-js-providers';
import * as core from '@playkit-js/playkit-js';
import { EngineType } from '@playkit-js/playkit-js';
import { Error as Error_2 } from '@playkit-js/playkit-js';
import { EventManager } from '@playkit-js/playkit-js';
import { FakeEvent } from '@playkit-js/playkit-js';
import { FakeEventTarget } from '@playkit-js/playkit-js';
import { LoggerLevels } from '@playkit-js/playkit-js';
import { MediaType } from '@playkit-js/playkit-js';
import { OTTProviderMediaInfoObject } from '@playkit-js/playkit-js-providers';
import { OVPProviderMediaInfoObject } from '@playkit-js/playkit-js-providers';
import { PKAbrConfigObject } from '@playkit-js/playkit-js';
import { PKDimensionsConfig } from '@playkit-js/playkit-js';
import { PKDrmDataObject } from '@playkit-js/playkit-js';
import { PKEventTypes } from '@playkit-js/playkit-js';
import { PKMediaSourceObject } from '@playkit-js/playkit-js';
import { PKMetadataConfigObject } from '@playkit-js/playkit-js';
import { PKPlaybackConfigObject } from '@playkit-js/playkit-js';
import { PKPlayerDimensions } from '@playkit-js/playkit-js';
import { PKSessionConfigObject } from '@playkit-js/playkit-js';
import { PKSourcesConfigObject } from '@playkit-js/playkit-js';
import { PKTextConfigObject } from '@playkit-js/playkit-js';
import { ProviderEntryListObject } from '@playkit-js/playkit-js-providers';
import { ProviderMediaConfigSessionObject } from '@playkit-js/playkit-js-providers';
import { ProviderMediaConfigSourcesObject } from '@playkit-js/playkit-js-providers';
import { ProviderMediaInfoObject } from '@playkit-js/playkit-js-providers';
import { ProviderOptionsObject } from '@playkit-js/playkit-js-providers';
import { ProviderPlaylistInfoObject } from '@playkit-js/playkit-js-providers';
import { ProviderPlaylistMetadataObject } from '@playkit-js/playkit-js-providers';
import { ProviderPlaylistObject } from '@playkit-js/playkit-js-providers';
import * as providers from '@playkit-js/playkit-js-providers';
import { StateType } from '@playkit-js/playkit-js';
import { StreamType } from '@playkit-js/playkit-js';
import { TextStyle } from '@playkit-js/playkit-js';
import { ThumbnailInfo } from '@playkit-js/playkit-js';
import { TimedMetadata } from '@playkit-js/playkit-js';
import { Track } from '@playkit-js/playkit-js';
import { TrackType } from '@playkit-js/playkit-js';
import { TrackTypes } from '@playkit-js/playkit-js';
import * as ui from '@playkit-js/playkit-js-ui';
import { UIEventType } from '@playkit-js/playkit-js-ui';
import { UIOptionsObject } from '@playkit-js/playkit-js-ui';
import { UIPreset } from '@playkit-js/playkit-js-ui';

/**
 * @class Ad
 * @param {string} id - Ad ID.
 * @param {PKAdOptions} options - Ad data options.
 */
export declare class Ad {
    private readonly _id;
    private readonly _system;
    private readonly _url;
    private readonly _contentType;
    private readonly _title;
    private readonly _position;
    private readonly _duration;
    private readonly _clickThroughUrl;
    private _posterUrl;
    private readonly _skipOffset;
    private _linear;
    private readonly _width;
    private readonly _height;
    private readonly _bitrate;
    private readonly _bumper;
    private readonly _inStream;
    private readonly _vpaid;
    private readonly _streamId;
    private readonly _wrapperAdIds;
    private readonly _wrapperCreativeIds;
    private readonly _wrapperAdSystems;
    constructor(id: string, options: PKAdOptions);
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad ID.
     */
    get id(): string;
    /**
     * @instance
     * @memberof Ad
     * @return {string | undefined} - Ad system.
     */
    get system(): string | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad content type.
     */
    get contentType(): string | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad URL.
     */
    get url(): string | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad title.
     */
    get title(): string | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad position inside the ad break.
     */
    get position(): number | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad duration.
     */
    get duration(): number | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad click through URL.
     */
    get clickThroughUrl(): string | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad poster URL.
     */
    get posterUrl(): string | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad skip offset.
     */
    get skipOffset(): number | undefined;
    /**
     * @instance
     * @memberof Ad
     * @return {boolean} - Whether the ad is linear.
     */
    get linear(): boolean;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad width.
     */
    get width(): number;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad height.
     */
    get height(): number;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Ad bitrate.
     */
    get bitrate(): number;
    /**
     * @instance
     * @memberof Ad
     * @return {boolean} - Whether the ad is bumper.
     */
    get bumper(): boolean;
    /**
     * @instance
     * @memberof Ad
     * @return {boolean} - Whether the ad is imadai.
     */
    get inStream(): boolean;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - Whether the ad is skippable or not.
     */
    get skippable(): boolean;
    /**
     * @instance
     * @memberof Ad
     * @return {boolean} - Whether the ad is vpaid or not.
     */
    get vpaid(): boolean;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - The ad streamId.
     */
    get streamId(): string;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - The ad wrapperAdIds.
     */
    get wrapperAdIds(): Array<string>;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - The ad wrapperCreativeIds.
     */
    get wrapperCreativeIds(): Array<string>;
    /**
     * @instance
     * @memberof Ad
     * @return {string} - The ad wrapperAdSystems.
     */
    get wrapperAdSystems(): Array<string>;
    toJSON(): any;
}

export declare class AdBreak {
    private readonly _type;
    private readonly _position;
    private readonly _numAds;
    constructor(options: PKAdBreakOptions);
    /**
     * @instance
     * @memberof AdBreak
     * @return {string} - Ad break type - pre/mid/post.
     */
    get type(): string | undefined;
    /**
     * @instance
     * @memberof AdBreak
     * @return {string} - Ad break position on the playback timeline.
     */
    get position(): number | undefined;
    /**
     * @instance
     * @memberof AdBreak
     * @return {string} - The number of ads inside the ad break.
     */
    get numAds(): number | undefined;
    toJSON(): any;
}

/**
 * @typedef {Object} KPAdBreakObject@typedef {Object} KPAdBreakObject
 * @property {number} position - The position; in seconds; to show the ad break.
 * @property {number} percentage - Alternative parameter to `position`. The position; in percentage of the media length; to show the ad break (optional).
 * @property {number} every - Alternative parameter to `position`. Play ad break every X seconds (optional).
 * @property {AdPod} ads - An array of ads to play (Ad pod).
 */
declare interface AdBreakObject {
    position: number;
    percentage?: number;
    every?: number;
    ads: AdObject[];
}

/**
 * @typedef {Object} KPAdObject@typedef {Object} KPAdObject
 * @property {Array<string>} url - List of urls; each one specifies the ad tag url that is requested from the ad server. The player will request the first url; if failed; it will request the second url and so on (aka waterfalling).
 * @property {Array<string>} response - List of XMLs; each one specifies a VAST 2.0 document to be used as the ads response instead of making a request via an ad tag url. The player will use the first XML; if failed; it will use the second and so on (aka waterfalling).
 * @property {boolean} bumper - Specifies whether this is a bumper.
 * @property {PrebidConfig} prebid - Specifies whether this is a prebid ad and add the relevant config for prebid request.
 */
declare interface AdObject {
    url?: Array<string>;
    response?: Array<string>;
    bumper?: boolean;
    prebid?: PrebidConfig;
}

export declare interface AdPrebidConfig {
    adUnit: Object;
    params?: Object;
    options?: Object;
    timeout: number;
}

/**
 * @class AdsController
 * @param {Player} player - The player.
 * @param {IAdsController} adsPluginController - The controller of the current ads plugin instance.
 */
declare class AdsController extends FakeEventTarget implements IAdsController {
    private static _logger;
    private readonly _player;
    private _adsPluginControllers;
    private _allAdsCompleted;
    private _eventManager;
    private _liveEventManager;
    private _adBreaksLayout;
    private _adBreak;
    private _ad;
    private _adPlayed;
    private _snapback;
    private _configAdBreaks;
    private _adIsLoading;
    private _isAdPlaying;
    private _middleware;
    private readonly _prebidManager;
    private _liveSeeking;
    prerollReady: Promise<any>;
    constructor(player: KalturaPlayer, adsPluginControllers: Array<IAdsPluginController>);
    /**
     * @instance
     * @memberof AdsController
     * @returns {boolean} - Whether all ads completed.
     */
    get allAdsCompleted(): boolean;
    /**
     * @instance
     * @memberof AdsController
     * @returns {boolean} - Whether an ad is playing.
     */
    isAdPlaying(): boolean;
    /**
     * @instance
     * @memberof AdsController
     * @returns {boolean} - Whether we're in an ad break.
     */
    isAdBreak(): boolean;
    /**
     * @instance
     * @memberof AdsController
     * @returns {Array<number|string>} - The ad breaks layout (cue points).
     */
    getAdBreaksLayout(): Array<number | string>;
    /**
     * @instance
     * @memberof AdsController
     * @returns {?AdBreak} - Gets the current ad break data.
     */
    getAdBreak(): AdBreak | undefined;
    /**
     * @instance
     * @memberof AdsController
     * @returns {?Ad} - Gets the current ad data.
     */
    getAd(): Ad | undefined;
    /**
     * Skip on an ad.
     * @instance
     * @memberof AdsController
     * @returns {void}
     */
    skipAd(): void;
    /**
     * Play an ad on demand.
     * @param {KPAdPod} adPod - The ad pod play.
     * @instance
     * @memberof AdsController
     * @returns {void}
     */
    playAdNow(adPod: KPAdPod): void;
    getMiddleware(): BaseMiddleware;
    private _init;
    private _initMembers;
    private _addBindings;
    private _handleConfiguredAdBreaks;
    private _validateOneTimeConfig;
    private _dispatchAdManifestLoaded;
    private _handlePrebidAdConfig;
    private _getPrebidAds;
    private _handleConfiguredPreroll;
    private _handleEveryAndPercentage;
    private _attachLiveSeekedHandler;
    private _pushNextAdsForLive;
    private _handleConfiguredMidrolls;
    private _handleReturnToLive;
    private _playAdBreak;
    private _onAdManifestLoaded;
    private _onAdBreakStart;
    private _onAdLoaded;
    private _onAdStarted;
    private _onAdBreakEnd;
    private _onAdsCompleted;
    private _onAdError;
    private _isBumper;
    private _onEnded;
    private _onPlaybackEnded;
    private _handleConfiguredPostroll;
    private _reset;
    private _destroy;
    private _mergeAdBreaks;
}

/**
 * @typedef {Object} KPAdvertisingConfigObject@typedef {Object} KPAdvertisingConfigObject
 * @property {PrebidConfig} prebid - The prebid config.
 * @property {Array<KPAdBreakObject>} adBreaks - The ad breaks scheme.
 * @property {number} [playAdsAfterTime] - Only play ad breaks scheduled after this time (in seconds). This setting is strictly after - e.g. setting playAdsAfterTime to 15 will cause the player to ignore an ad break scheduled to play at 15s.
 * @property {boolean} [showAdBreakCuePoint] - Whether to show the ad breaks cue points.
 * @property {Object} [adBreakCuePointStyle] - Style options for the ad breaks cue points - See the options {@link https://github.com/kaltura/playkit-js-timeline/blob/main/docs/types.md#cuepointoptionsobject|Here}.
 */
export declare interface AdvertisingConfig {
    prebid?: PrebidConfig;
    adBreaks: AdBreakObject[];
    playAdsAfterTime?: number;
    showAdBreakCuePoint?: boolean;
    adBreakCuePointStyle?: Object;
}

/** The BasePlugin responsible to implement the plugin interface.
 * Contains several default implementations.
 * Other plugins should extend this class.
 * @classdesc
 */
export declare class BasePlugin implements IPlugin {
    protected logger: any;
    /**
     * The runtime configuration of the plugin.
     * @member
     */
    protected config: any;
    /**
     * The name of the plugin.
     * @member
     */
    name: string;
    /**
     * The logger of the plugin.
     * @member
     */
    /**
     * Reference to the actual player.
     * @member
     */
    protected player: KalturaPlayer;
    /**
     * The event manager of the plugin.
     * @member
     */
    protected eventManager: EventManager;
    /**
     * The default configuration of the plugin.
     * Inherited plugins should override this property.
     * @type {Object}
     * @static
     * @member
     */
    protected static defaultConfig: any;
    /**
     * Factory method to create the actual plugin.
     * @param {string} name - The plugin name
     * @param {Object} player - The player reference
     * @param {Object} config - The plugin configuration
     * @returns {BasePlugin} - New runtime plugin instance
     * @static
     * @public
     */
    static createPlugin(name: string, player: KalturaPlayer, config?: any): BasePlugin;
    /**
     * Returns under what conditions the plugin is valid.
     * Plugin must implement this method.
     * @returns {boolean} - Whether the plugin is valid and can be initiated. Default implementation is true
     * @static
     * @public
     * @abstract
     */
    protected static isValid(): boolean;
    /**
     * constructor
     * @param {string} name - The plugin name
     * @param {Object} player - The player reference
     * @param {Object} config - The plugin configuration
     * @constructor
     * @private
     */
    constructor(name: string, player: KalturaPlayer, config: any);
    /**
     * Getter for the configuration of the plugin.
     * @param {string} attr - The key in the plugin configuration (optional).
     * @returns {*} - If attribute is provided, returns its value. Else, Returns the config of the plugin.
     * @public
     */
    getConfig(attr?: string): any;
    /**
     * Getter for the ready promise of the plugin.
     * @returns {Promise<*>} - returns a resolved promise unless the plugin overrides this ready getter.
     * @public
     */
    protected get ready(): Promise<any>;
    /**
     * Updates the config of the plugin.
     * @param {Object} update - The updated configuration.
     * @public
     * @returns {void}
     */
    updateConfig(update: any): void;
    /**
     * Runs the loadMedia logic of the plugin.
     * plugin must implement this method.
     * @public
     * @virtual
     * @returns {void}
     */
    loadMedia(): void;
    /**
     * Runs the destroy logic of the plugin.
     * plugin must implement this method.
     * @public
     * @virtual
     * @returns {void}
     */
    destroy(): void;
    /**
     * Runs the reset logic of the plugin.
     * plugin must implement this method.
     * @public
     * @virtual
     * @returns {void}
     */
    reset(): void;
    /**
     * Getter for the plugin's name.
     * @returns {string} - The name of the plugin.
     * @public
     */
    getName(): string;
    /**
     * Dispatch an event via the plugin.
     * @param {string} name - The event name.
     * @param {any} payload - The event payload.
     * @returns {void}
     */
    dispatchEvent(name: string, payload: any): void;
}

/**
 * Basic remote player.
 * Implements the Kaltura Player playback, ads, tracks,vr and cast APIs.
 * Remote players should extend this class and implement the needed API.
 * @class BaseRemotePlayer
 * @param {string} name - Remote player name.
 * @param {Object} config - Cast configuration.
 * @param {RemoteControl} remoteControl - Remote control.
 * @extends {FakeEventTarget}
 * @implements {IRemotePlayer}
 */
declare class BaseRemotePlayer extends FakeEventTarget implements IRemotePlayer {
    /**
     * Default configuration of the remote player.
     * @static
     * @type {Object}
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.defaultConfig // {}
     */
    private static defaultConfig;
    /**
     * Remote player type.
     * @static
     * @type {string}
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.Type // 'BaseRemotePlayer'
     */
    private static Type;
    /**
     * @static
     * @returns {boolean} - Whether the remote player is supported in the current environment.
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.isSupported() // true
     */
    static isSupported(): boolean;
    private static _logger;
    private _remoteControl;
    private _playerConfig;
    private _castConfig;
    private _eventManager;
    private _isCastInitiator;
    constructor(name: string, castConfig: any, remoteControl: RemoteControl);
    /**
     * Loads a media to the receiver application.
     * @param {Object} mediaInfo - The entry media info.
     * @returns {Promise<void>} - Promise to indicate load succeed or failed.
     * @instance
     * @memberof BaseRemotePlayer
     */
    loadMedia(mediaInfo: any): Promise<any>;
    /**
     * Sets a media to the remote player..
     * @param {Object} mediaConfig - Media configuration to set.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    setMedia(mediaConfig: any): void;
    /**
     * Gets the media Info.
     * @returns {?Object} - The media info.
     * @instance
     * @memberof BaseRemotePlayer
     */
    getMediaInfo(): any;
    /**
     * Gets the media config.
     * @returns {?Object} - The media config.
     * @instance
     * @memberof BaseRemotePlayer
     */
    getMediaConfig(): any;
    /**
     * Configure the remote player
     * @param {Object} config - Configuration to set.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    configure(config?: any): void;
    /**
     * The remote player readiness.
     * @returns {Promise<any>} - Promise which resolved when the remote player is ready.
     * @instance
     * @memberof BaseRemotePlayer
     */
    ready(): Promise<any>;
    /**
     * Load the remote player.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    load(): void;
    /**
     * Play/resume the remote player.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    play(): void;
    /**
     * Pause the remote player.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    pause(): void;
    /**
     * Reset the remote player.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    reset(): void;
    /**
     * Destroy the remote player.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    destroy(): void;
    /**
     * @returns {boolean} - Whether the current playback is a live playback.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.isLive() // false
     */
    isLive(): boolean;
    /**
     * @returns {boolean} - Whether the current live playback has DVR window. In case of non-live playback will return false.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.isDvr() // false
     */
    isDvr(): boolean;
    /**
     * Seeks to the live edge.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    seekToLiveEdge(): void;
    /**
     * @returns {number} - The start time of the DVR window.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.getStartTimeOfDvrWindow() // 0
     */
    getStartTimeOfDvrWindow(): number;
    /**
     * @param {string} [type] - Track type.
     * @returns {Array<Track>} - The remote player tracks.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.getTracks() // []
     */
    getTracks(type?: string): Array<Track>;
    /**
     * @returns {Object} - The remote player active tracks.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.getTracks() // {audio: undefined, video: undefined, text: undefined}
     */
    getActiveTracks(): any;
    /**
     * Select a certain track to be active.
     * @param {Track} track - The track to activate.
     * @returns {void}
     * @instance
     * @memberof BaseRemotePlayer
     */
    selectTrack(track: Track): void;
    /**
     * Hides the active text track.
     * @returns {void}
     * @instance
     * @memberof BaseRemotePlayer
     */
    hideTextTrack(): void;
    /**
     * @function enableAdaptiveBitrate
     * @description Enables automatic adaptive bitrate switching.
     * @returns {void}
     * @instance
     * @memberof BaseRemotePlayer
     */
    enableAdaptiveBitrate(): void;
    /**
     * @function isAdaptiveBitrateEnabled
     * @returns {boolean} - Whether adaptive bitrate is enabled.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.isAdaptiveBitrateEnabled() // true
     */
    isAdaptiveBitrateEnabled(): boolean;
    /**
     * Sets the text display settings.
     * @function setTextDisplaySettings
     * @param {Object} settings - Text settings.
     * @instance
     * @memberof BaseRemotePlayer
     * @returns {void}
     */
    setTextDisplaySettings(settings: any): void;
    /**
     * Start casting.
     * @returns {Promise<any>} - A promise to indicate session is starting, or failed
     * @instance
     * @memberof BaseRemotePlayer
     */
    startCasting(): Promise<void>;
    /**
     * Stops the current cast session.
     * @returns {void}
     * @instance
     * @memberof BaseRemotePlayer
     */
    stopCasting(): void;
    /**
     * @returns {boolean} - Whether casting is currently active.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.isCasting() // true
     */
    isCasting(): boolean;
    /**
     * @returns {boolean} - Whether casting is available.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.isCastAvailable() // true
     */
    isCastAvailable(): boolean;
    /**
     * Gets the current remote session.
     * @returns {RemoteSession} - The remote session.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.getCastSession() // new RemoteSession('', '')
     */
    getCastSession(): RemoteSession;
    /**
     * @returns {boolean} - Whether the current media is of VR type (360 content).
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.isVr() // false
     */
    isVr(): boolean;
    /**
     * Toggles VR mode on the current content.
     * @instance
     * @returns {void}
     * @memberof BaseRemotePlayer
     */
    toggleVrStereoMode(): void;
    /**
     * @returns {boolean} - Whether the current content displayed in VR mode.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.isInVrStereoMode() // false
     */
    isInVrStereoMode(): boolean;
    /**
     * The remote player ads controller.
     * @type {?Object}
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.ads // null
     */
    get ads(): any;
    /**
     * Setter.
     * @param {TextStyle} style - The text style to set.
     * @returns {void}
     * @instance
     * @memberof BaseRemotePlayer
     */
    set textStyle(style: TextStyle);
    /**
     * Getter.
     * @returns {TextStyle} - The current text style.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.textStyle // new TextStyle()
     */
    get textStyle(): TextStyle;
    /**
     * Gets the first buffered range of the remote player.
     * @returns {Array<any>} - First buffered range in seconds.
     * @public
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.buffered // []
     */
    get buffered(): Array<any>;
    /**
     * Setter.
     * @param {number} to - The number to set in seconds.
     * @returns {void}
     * @instance
     * @memberof BaseRemotePlayer
     */
    set currentTime(to: number);
    /**
     * Getter.
     * @returns {number} - The current time in seconds.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.currentTime // 0
     */
    get currentTime(): number;
    /**
     * @returns {number} - The duration in seconds.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.duration // 0
     */
    get duration(): number;
    /**
     * @returns {number} - The live duration in seconds.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.liveDuration // NaN
     */
    get liveDuration(): number;
    /**
     * Setter.
     * @param {number} vol - The volume to set in the range of 0-1.
     * @returns {void}
     * @instance
     * @memberof BaseRemotePlayer
     */
    set volume(vol: number);
    /**
     * Getter.
     * @returns {number} - The current volume in the range of 0-1.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.volume // 1
     */
    get volume(): number;
    /**
     * @returns {boolean} - Whether the cast player is in paused state.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.paused // false
     */
    get paused(): boolean;
    /**
     * @returns {boolean} - Whether the cast player is in ended state.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.ended // false
     */
    get ended(): boolean;
    /**
     * @returns {boolean} - Whether the cast player is in seeking state.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.seeking // false
     */
    get seeking(): boolean;
    /**
     * Setter.
     * @param {boolean} mute - The mute value to set.
     * @returns {void}
     * @instance
     * @memberof BaseRemotePlayer
     */
    set muted(mute: boolean);
    /**
     * Getter.
     * @returns {boolean} - The muted state.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.muted // false
     */
    get muted(): boolean;
    /**
     * @returns {string} - The current playing source url.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.src // ''
     */
    get src(): string;
    /**
     * @returns {string} - The current poster url.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.poster // ''
     */
    get poster(): string;
    /**
     * Setter.
     * @param {number} rate - The playback rate to set.
     * @instance
     * @memberof BaseRemotePlayer
     */
    set playbackRate(rate: number);
    /**
     * @returns {string} - The current playback rate.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.playbackRate // 1
     */
    get playbackRate(): number;
    /**
     * @returns {string} - The active engine type.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.engineType // ''
     */
    get engineType(): string;
    /**
     * @returns {string} - The active stream type.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.streamType // ''
     */
    get streamType(): string;
    /**
     * @returns {string} - The remote player type.
     * @instance
     * @memberof BaseRemotePlayer
     * @example
     * BaseRemotePlayer.prototype.type // BaseRemotePlayer.Type
     */
    get type(): string;
    /**
     * @returns {KPOptionsObject} - The runtime remote player config.
     * @instance
     * @memberof BaseRemotePlayer
     */
    get config(): any;
    set isCastInitiator(isCastInitiator: boolean);
    get isCastInitiator(): boolean;
}

export declare const cast: {
    registerRemotePlayer: typeof RemotePlayerManager.register;
    PlayerSnapshot: typeof PlayerSnapshot;
    RemoteControl: typeof RemoteControl;
    RemoteSession: typeof RemoteSession;
    BaseRemotePlayer: typeof BaseRemotePlayer;
    RemoteConnectedPayload: typeof RemoteConnectedPayload;
    RemoteDisconnectedPayload: typeof RemoteDisconnectedPayload;
    RemoteAvailablePayload: typeof RemoteAvailablePayload;
    RemotePlayerUI: typeof RemotePlayerUI;
    CastEventType: {
        readonly CAST_SESSION_START_FAILED: "kaltura-player-castsessionstartfailed";
        readonly CAST_SESSION_STARTING: "kaltura-player-castsessionstarting";
        readonly CAST_SESSION_STARTED: "kaltura-player-castsessionstarted";
        readonly CAST_SESSION_ENDING: "kaltura-player-castsessionending";
        readonly CAST_SESSION_ENDED: "kaltura-player-castsessionended";
        readonly CAST_AVAILABLE: "kaltura-player-castavailable";
    };
    RemotePlayerType: {
        [type: string]: string;
    };
    TextStyleConverter: typeof TextStyleConverter;
    CustomEventMessage: typeof CustomEventMessage;
    CustomActionMessage: typeof CustomActionMessage;
    CustomMessageType: {
        [type: string]: string;
    };
    CustomActionType: {
        [action: string]: string;
    };
    CustomMessage: typeof CustomMessage;
};

/**
 * @const {Object} CastEventType
 *
 * @example
 * // Events lifecycle
 * 1. CAST_AVAILABLE
 * 2. CAST_SESSION_STARTING
 * 3. CAST_SESSION_STARTED || CAST_SESSION_START_FAILED -> X
 * 4. CAST_SESSION_ENDING
 * 5. CAST_SESSION_ENDED
 * @example
 * // How to use
 * player.addEventListener(KalturaPlayer.cast.CastEventType.CAST_SESSION_STARTED, e => {
 *   console.log(e.session);
 * };
 */
declare const CastEventType: {
    /**
     * Fires when cast session start failed.
     * @event CAST_SESSION_START_FAILED
     * @memberof CastEventType
     */
    readonly CAST_SESSION_START_FAILED: "kaltura-player-castsessionstartfailed";
    /**
     * Fires when cast session starting.
     * @event CAST_SESSION_STARTING
     * @memberof CastEventType
     */
    readonly CAST_SESSION_STARTING: "kaltura-player-castsessionstarting";
    /**
     * Fires when cast session started.
     * @event CAST_SESSION_STARTED
     * @memberof CastEventType
     */
    readonly CAST_SESSION_STARTED: "kaltura-player-castsessionstarted";
    /**
     * Fires when cast session ending.
     * @event CAST_SESSION_ENDING
     * @memberof CastEventType
     */
    readonly CAST_SESSION_ENDING: "kaltura-player-castsessionending";
    /**
     * Fires when cast session ended.
     * @event CAST_SESSION_ENDED
     * @memberof CastEventType
     */
    readonly CAST_SESSION_ENDED: "kaltura-player-castsessionended";
    /**
     * Fires when cast is available.
     * @event CAST_AVAILABLE
     * @memberof CastEventType
     */
    readonly CAST_AVAILABLE: "kaltura-player-castavailable";
};

export declare type ClassConstructor<T> = new (...args: any[]) => T;

export { core }

export declare interface CuePoint {
    id: string;
    startTime: number;
    endTime: number;
    metadata: any;
}

declare class CuePointManager {
    private _player;
    private _textTrack;
    constructor(player: KalturaPlayer);
    private _addTextTrack;
    private _getMetadataTracks;
    private _createTextTrackCue;
    private _cuesSorter;
    getAllCuePoints(): Array<TimedMetadata>;
    getActiveCuePoints(): Array<TimedMetadata>;
    private _getTextTrackCueById;
    private _removeTextTrackCue;
    addCuePoints(data: CuePoint[]): void;
    private _clearAllTextTrackCues;
    reset(): void;
    destroy(): void;
}

declare class CustomActionMessage extends CustomMessage {
    action: string;
    args: any;
    constructor(action: string, args: any);
}

declare class CustomEventMessage extends CustomMessage {
    event: string;
    payload: any;
    constructor(event: string, payload: any);
}

declare class CustomMessage {
    type: string;
    constructor(type: string);
}

/**
 * @typedef {Object} DRMSupportedObject@typedef {Object} DRMSupportedObject
 * @property {number} isDRMSupported - Specifies DRM supported option by the browser
 * @property {Array<string>} supportedDRMs - List of supported DRMs (optional values: widevine; playready; fairplay)
 */
export declare type DRMSupportedObject = {
    isDRMSupported: number;
    supportedDRMs: Array<string>;
};

export declare interface ExternalThumbnailsConfig {
    vttUrl: string;
}

/**
 * get a player instance by id
 * @param {string} id - the player ID
 * @returns {KalturaPlayer | null} - the player if found by the supplied ID or null if key doesn't exist
 */
export declare function getPlayer(id: string): KalturaPlayer | null;

/**
 * get all instantiated players
 * @returns {KalturaPlayers} - map of player ids and their respective instantiated player
 */
export declare function getPlayers(): Record<string, KalturaPlayer>;

/**
 * @typedef {Object} HEVCConfigObject@typedef {Object} HEVCConfigObject
 * @property {number} width - Optional width of the video
 * @property {number} height - Optional height of the video
 * @property {number} bitrate - Optional number of bits used to encode a second of video
 * @property {number} framerate - Optional number of frames used in one second
 */
export declare type HEVCConfigObject = {
    width?: number;
    height?: number;
    bitrate?: number;
    framerate?: number;
};

/**
 * @typedef {Object} HEVCSupportedObject@typedef {Object} HEVCSupportedObject
 * @property {number} isHEVCSupported - Specifies HEVC supported option by the browser
 * @property {number} isPowerEfficient - Specifies power efficiency supported option
 */
export declare type HEVCSupportedObject = {
    isHEVCSupported: number;
    isPowerEfficient: number;
};

export declare interface IAdsController {
    allAdsCompleted: boolean;
    isAdBreak(): boolean;
    getAdBreaksLayout(): Array<number | string>;
    getAdBreak(): AdBreak | undefined;
    getAd(): Ad | undefined;
    skipAd(): void;
    playAdNow(adPod: KPAdPod): void;
}

export declare interface IAdsControllerProvider {
    getAdsController(): IAdsPluginController;
}

export declare interface IAdsPluginController {
    skipAd(): void;
    playAdNow(adPod: KPAdPod): void;
    onPlaybackEnded(): Promise<void>;
    active: boolean;
    done: boolean;
    name: string;
}

export declare interface ImageSourceOptions {
    thumbnailAPIParams: {
        [parmaName: string]: string;
    };
}

declare interface IPlugin {
}

/**
 * @interface IRemotePlayer
 *
 */
declare interface IRemotePlayer {
    /**
     * @type {TextStyle}
     * @instance
     * @memberof IRemotePlayer
     */
    textStyle: TextStyle;
    /**
     * @type {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    muted: boolean;
    /**
     * @type {number}
     * @instance
     * @memberof IRemotePlayer
     */
    playbackRate: number;
    /**
     * @type {number}
     * @instance
     * @memberof IRemotePlayer
     */
    volume: number;
    /**
     * @type {number}
     * @instance
     * @memberof IRemotePlayer
     */
    currentTime: number;
    /**
     * @readonly
     * @type {number}
     * @instance
     * @memberof IRemotePlayer
     */
    buffered: Array<any>;
    /**
     * @readonly
     * @type {number}
     * @instance
     * @memberof IRemotePlayer
     */
    duration: number;
    /**
     * @readonly
     * @type {number}
     * @instance
     * @memberof IRemotePlayer
     */
    liveDuration: number;
    /**
     * @readonly
     * @type {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    paused: boolean;
    /**
     * @readonly
     * @type {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    ended: boolean;
    /**
     * @readonly
     * @type {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    seeking: boolean;
    /**
     * @readonly
     * @type {string}
     * @instance
     * @memberof IRemotePlayer
     */
    src: string;
    /**
     * @readonly
     * @type {string}
     * @instance
     * @memberof IRemotePlayer
     */
    poster: string;
    /**
     * @readonly
     * @type {string}
     * @instance
     * @memberof IRemotePlayer
     */
    engineType: string;
    /**
     * @readonly
     * @type {string}
     * @instance
     * @memberof IRemotePlayer
     */
    streamType: string;
    /**
     * @readonly
     * @type {string}
     * @instance
     * @memberof IRemotePlayer
     */
    type: string;
    /**
     * @readonly
     * @type {Object}
     * @memberof IRemotePlayer
     * @instance
     */
    ads: any;
    /**
     * @readonly
     * @type {KPOptionsObject}
     * @instance
     * @memberof IRemotePlayer
     */
    config: any;
    /**
     * @method
     * @param {string} type
     * @param {Function} listener
     * @instance
     * @memberof IRemotePlayer
     */
    addEventListener(type: string, listener: () => any): void;
    /**
     * @method
     * @param {string} type
     * @param {Function} listener
     * @instance
     * @memberof IRemotePlayer
     */
    removeEventListener(type: string, listener: () => any): void;
    /**
     * @method
     * @param {FakeEvent} event
     * @instance
     * @memberof IRemotePlayer
     */
    dispatchEvent(event: FakeEvent): void;
    /**
     * @method
     * @param {Object} mediaInfo
     * @instance
     * @memberof IRemotePlayer
     */
    loadMedia(mediaInfo: any): Promise<any>;
    /**
     * @method
     * @param {Object} mediaConfig
     * @instance
     * @memberof IRemotePlayer
     */
    setMedia(mediaConfig: any): void;
    /**
     * @method
     * @returns {Object}
     * @instance
     * @memberof IRemotePlayer
     */
    getMediaInfo(): ProviderMediaInfoObject;
    /**
     * @method
     * @returns {Object}
     * @instance
     * @memberof IRemotePlayer
     */
    getMediaConfig(): KPMediaConfig;
    /**
     * @method
     * @param {Object} config
     * @instance
     * @memberof IRemotePlayer
     */
    configure(config: any): void;
    /**
     * @method
     * @returns {Promise<any>}
     * @instance
     * @memberof IRemotePlayer
     */
    ready(): Promise<any>;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    load(): void;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    play(): void;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    pause(): void;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    reset(): void;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    destroy(): void;
    /**
     * @method
     * @returns {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    isLive(): boolean;
    /**
     * @method
     * @returns {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    isDvr(): boolean;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    seekToLiveEdge(): void;
    /**
     * @method
     * @returns {number}
     * @instance
     * @memberof IRemotePlayer
     */
    getStartTimeOfDvrWindow(): number;
    /**
     * @method
     * @param {string} [type]
     * @returns {Array<Track>}
     * @instance
     * @memberof IRemotePlayer
     */
    getTracks(type?: string): Array<Track>;
    /**
     * @method
     * @returns {Object}
     * @instance
     * @memberof IRemotePlayer
     */
    getActiveTracks(): any;
    /**
     * @method
     * @param {Track} track
     * @instance
     * @memberof IRemotePlayer
     */
    selectTrack(track: Track): void;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    hideTextTrack(): void;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    enableAdaptiveBitrate(): void;
    /**
     * @method
     * @returns {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    isAdaptiveBitrateEnabled(): boolean;
    /**
     * @method
     * @param {Object} settings
     * @instance
     * @memberof IRemotePlayer
     */
    setTextDisplaySettings(settings: any): void;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    startCasting(): void;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    stopCasting(): void;
    /**
     * @method
     * @returns {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    isCasting(): boolean;
    /**
     * @method
     * @returns {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    isCastAvailable(): boolean;
    /**
     * @method
     * @returns {RemoteSession}
     * @instance
     * @memberof IRemotePlayer
     */
    getCastSession(): RemoteSession;
    /**
     * @method
     * @returns {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    isVr(): boolean;
    /**
     * @method
     * @instance
     * @memberof IRemotePlayer
     */
    toggleVrStereoMode(): void;
    /**
     * @method
     * @returns {boolean}
     * @instance
     * @memberof IRemotePlayer
     */
    isInVrStereoMode(): boolean;
}

export declare const KALTURA_PLAYER_START_TIME_QS: string;

export declare class KalturaPlayer extends FakeEventTarget {
    private static _logger;
    private _localPlayer;
    private _provider;
    private _uiWrapper;
    private _controllerProvider;
    private _adsController;
    private _eventManager;
    private _attachEventManager;
    private _playlistManager;
    private _remotePlayerManager;
    private _mediaInfo;
    _remotePlayer: BaseRemotePlayer | null;
    private _pluginManager;
    private _pluginsConfig;
    private _reset;
    private _firstPlay;
    private _sourceSelected;
    private _pluginReadinessMiddleware;
    private _configEvaluator;
    private _appPluginConfig;
    private _viewabilityManager;
    _playbackStart: boolean;
    private _thumbnailManager;
    private _cuepointManager;
    private _serviceProvider;
    private _isVisible;
    private _autoPaused;
    constructor(options: KalturaPlayerConfig);
    loadMedia(mediaInfo: ProviderMediaInfoObject, mediaOptions?: SourcesConfig): Promise<any>;
    setMedia(mediaConfig: KPMediaConfig): void;
    loadPlaylist(playlistInfo: ProviderPlaylistInfoObject, playlistConfig: PlaylistConfigObject): Promise<ProviderPlaylistObject>;
    loadPlaylistByEntryList(entryList: ProviderEntryListObject, playlistConfig: PlaylistConfigObject): Promise<ProviderPlaylistObject>;
    setPlaylist(playlistData: ProviderPlaylistObject, playlistConfig: PlaylistConfigObject, entryList?: ProviderEntryListObject): void;
    configure(config?: Partial<KalturaPlayerConfig>): void;
    updateKalturaPoster(playerSources: PKSourcesConfigObject, mediaSources: ProviderMediaConfigSourcesObject, dimensions: PKPlayerDimensions): void;
    shouldAddKs(mediaConfig?: KPMediaConfig): boolean;
    getMediaInfo(): ProviderMediaInfoObject;
    getDrmInfo(): PKDrmDataObject | null;
    getMediaConfig(): KPMediaConfig;
    setSourcesMetadata(sourcesMetadata: PKMetadataConfigObject): void;
    ready(): Promise<void>;
    load(): void;
    play(): void;
    pause(): void;
    getView(): HTMLElement;
    getVideoElement(): HTMLVideoElement | undefined;
    reset(isChangeMedia?: boolean): void;
    destroy(): void;
    isLive(): boolean;
    isOnLiveEdge(): boolean;
    isDvr(): boolean;
    isUntimedImg(): boolean;
    isUntimedDoc(): boolean;
    isImage(): boolean;
    isAudio(): boolean;
    isDoc(): boolean;
    seekToLiveEdge(): void;
    getStartTimeOfDvrWindow(): number;
    getTracks(type?: TrackTypes): Array<Track>;
    getActiveTracks(): any;
    selectTrack(track: Track): void;
    hideTextTrack(): void;
    showTextTrack(): void;
    enableAdaptiveBitrate(): void;
    isAdaptiveBitrateEnabled(): boolean;
    setTextDisplaySettings(settings: any): void;
    get textDisplaySetting(): any;
    isFullscreen(): boolean;
    notifyEnterFullscreen(): void;
    notifyExitFullscreen(): void;
    enterFullscreen(fullScreenElementId?: string): void;
    exitFullscreen(): void;
    enterPictureInPicture(): void;
    exitPictureInPicture(): void;
    isInPictureInPicture(): boolean;
    isPictureInPictureSupported(): boolean;
    getLogLevel(name?: string): any;
    startCasting(type: string): Promise<void>;
    setIsCastInitiator(type: string, isCastInitiator: boolean): void;
    isCastAvailable(type?: string): boolean;
    getCastSession(): RemoteSession | null;
    stopCasting(): void;
    isCasting(): boolean;
    isVr(): boolean;
    toggleVrStereoMode(): void;
    isInVrStereoMode(): boolean;
    setLogLevel(level: any, name?: string): void;
    getThumbnail(time?: number): ThumbnailInfo | null;
    set textStyle(style: TextStyle);
    get textStyle(): TextStyle;
    get buffered(): TimeRanges | null;
    get stats(): any;
    set currentTime(to: number);
    get currentTime(): number | null;
    get duration(): number | null;
    get liveDuration(): number | null;
    /**
     * In VOD playback this setter is like the regular `currentTime` setter.
     * In live playback this setter normalizes the seek point to be relative to the start of the DVR window.
     * This setter is useful to display a seekbar presents the available seek range only.
     * @param {Number} to - The number to set in seconds (from 0 to the normalized duration).
     */
    set normalizedCurrentTime(to: number);
    /**
     * In VOD playback this getter is like the regular `currentTime` getter.
     * In live playback this getter normalizes the current time to be relative to the start of the DVR window.
     * This getter is useful to display a seekbar presents the available seek range only.
     */
    get normalizedCurrentTime(): number | null;
    /**
     * In VOD playback this getter is like the regular `duration` getter.
     * In live playback this getter normalizes the duration to be relative to the start of the DVR window.
     * This getter is useful to display a seekbar presents the available seek range only.
     */
    get normalizedDuration(): number | null;
    set volume(vol: number);
    get volume(): number | null;
    get paused(): boolean | null;
    get seeking(): boolean | null;
    set playsinline(playsinline: boolean);
    get playsinline(): boolean | null;
    set muted(mute: boolean);
    get muted(): boolean | null;
    get src(): string | null;
    get videoHeight(): number | null;
    get videoWidth(): number | null;
    set dimensions(dimensions: PKPlayerDimensions);
    get dimensions(): PKPlayerDimensions;
    get poster(): string;
    get ended(): boolean | null;
    set playbackRate(rate: number);
    get playbackRate(): number | null;
    get playbackRates(): Array<number>;
    get defaultPlaybackRate(): number;
    get engineType(): string;
    get streamType(): string;
    get env(): any;
    get selectedSource(): PKMediaSourceObject | null;
    get sources(): PKSourcesConfigObject;
    get config(): KalturaPlayerConfig;
    get hasUserInteracted(): boolean;
    set loadingMedia(loading: boolean);
    get ads(): AdsController | undefined;
    get plugins(): {
        [name: string]: BasePlugin;
    };
    get provider(): BaseProvider<OVPProviderMediaInfoObject | OTTProviderMediaInfoObject>;
    get ui(): UIWrapper;
    /**
     * The playlist controller.
     * @type {PlaylistManager}
     * @instance
     * @memberof KalturaPlayer
     * @example
     * KalturaPlayer.playlist.playNext();
     */
    get playlist(): PlaylistManager;
    get Event(): KPEventTypes;
    get TextStyle(): typeof TextStyle;
    get ViewabilityType(): typeof ViewabilityType;
    get State(): typeof StateType;
    get Track(): typeof TrackType;
    get LogLevelType(): Record<keyof LoggerLevels, keyof LoggerLevels>;
    get LogLevel(): LoggerLevels;
    get AbrMode(): typeof AbrMode;
    get MediaType(): typeof MediaType;
    get StreamType(): typeof StreamType;
    get EngineType(): typeof EngineType;
    get Error(): typeof Error_2;
    private _addBindings;
    private _onChangeSourceEnded;
    private _onPlayerReset;
    private _onChangeSourceStarted;
    private _onEnded;
    private _onPlaybackEnded;
    private _onAdStarted;
    private _onAdAutoplayFailed;
    private _configureOrLoadPlugins;
    private _maybeCreateAdsController;
    attachMediaSource(): void;
    detachMediaSource(): void;
    private _resetProviderPluginsConfig;
    /**
     * Set crossOrigin attribute.
     * @param {?string} crossOrigin - 'anonymous', 'use-credentials' or null to remove attribute
     * anonymous: CORS requests for this element will not have the credentials flag set.
     * use-credentials: CORS requests for this element will have the credentials flag set; this means the request will provide credentials.
     */
    set crossOrigin(crossOrigin: string);
    /**
     * Get crossOrigin attribute.
     * @returns {?string} - 'anonymous' or 'use-credentials'
     */
    get crossOrigin(): string | null;
    /**
     * Gets the player visibility state
     * @returns {boolean} - whether the player is in the active browser tab and visible in the view port
     * @public
     */
    get isVisible(): boolean;
    /**
     * Gets the player viewability manager service
     * @returns {ViewabilityManager} - player viewability manager
     * @public
     */
    get viewabilityManager(): ViewabilityManager;
    private _handleVisibilityChange;
    private _handleAutoPause;
    /**
     * Gets a registered service of that name
     * @param {string} name - the service name
     * @returns {Object} - the service object
     */
    getService(name: string): any | void;
    /**
     * Checks if a service of that name has been registered
     * @param {string} name - the service name
     * @returns {boolean} - if the service exist
     */
    hasService(name: string): boolean;
    /**
     * Registers a service to be used across the player
     * @param {string} name - the service name
     * @param {Object} service - the service object
     * @returns {void}
     */
    registerService(name: string, service: any): void;
    get cuePointManager(): CuePointManager;
    /**
     * Add text track
     * @function addTextTrack
     * @param {string} kind - Specifies the kind of text track.
     * @param {?string} label - A string specifying the label for the text track.
     * @returns {?TextTrack} - A TextTrack Object, which represents the new text track.
     * @public
     */
    addTextTrack(kind: TextTrackKind, label?: string): TextTrack | undefined;
    /**
     * get the native text tracks
     * @function getNativeTextTracks
     * @returns {Array<TextTrack>} - The native TextTracks array.
     * @public
     */
    getNativeTextTracks(): Array<TextTrack>;
    get remotePlayerManager(): RemotePlayerManager;
    /**
     * get the media capabilities
     * @function getMediaCapabilities
     * @param {HEVCConfigObject} hevcConfig - The HEVC configuration to check (optional).
     * @returns {Promise<MediaCapabilitiesObject>} - The media capabilities object.
     * @public
     */
    getMediaCapabilities(hevcConfig?: HEVCConfigObject): Promise<MediaCapabilitiesObject>;
}

export declare interface KalturaPlayerConfig {
    targetId: string;
    log?: LogConfig;
    disableUserCache?: boolean;
    text?: PKTextConfigObject;
    playback: PlaybackConfig;
    sources: PKSourcesConfigObject;
    plugins: PluginsConfig;
    advertising: AdvertisingConfig;
    session?: PKSessionConfigObject;
    provider: ProviderOptionsObject;
    playlist?: PlaylistConfig;
    dimensions?: PKDimensionsConfig;
    ui: UiConfig;
    cast?: {
        [key: string]: any;
    };
    productVersion?: string;
    viewability: ViewabilityConfig;
    network?: NetworkConfig;
    abr?: PKAbrConfigObject;
}

/**
 * @typedef {Object} KPAdBreakObject@typedef {Object} KPAdBreakObject
 * @property {number} position - The position, in seconds, to show the ad break.
 * @property {number} percentage - Alternative parameter to `position`. The position, in percentage of the media length, to show the ad break (optional).
 * @property {number} every - Alternative parameter to `position`. Play ad break every X seconds (optional).
 * @property {KPAdPod} ads - An array of ads to play (Ad pod).
 */
export declare type KPAdBreakObject = {
    position: number;
    percentage?: number;
    every?: number;
    ads: KPAdPod;
};

/**
 * @typedef {Object} KPAdObject@typedef {Object} KPAdObject
 * @property {Array<string>} url - List of urls, each one specifies the ad tag url that is requested from the ad server. The player will request the first url, if failed, it will request the second url and so on (aka waterfalling).
 * @property {Array<string>} response - List of XMLs, each one specifies a VAST 2.0 document to be used as the ads response instead of making a request via an ad tag url. The player will use the first XML, if failed, it will use the second and so on (aka waterfalling).
 * @property {boolean} bumper - Specifies whether this is a bumper.
 * @property {KPAdPrebidConfig} prebid - Specifies whether this is a prebid ad and add the relevant config for prebid request.
 */
export declare type KPAdObject = {
    url?: Array<string>;
    response?: Array<string>;
    bumper?: boolean;
    prebid?: KPAdPrebidConfig;
};

/**
 * @typedef {Array<KPAdObject>} KPAdPod
 */
export declare type KPAdPod = Array<KPAdObject>;

export declare interface KPAdPrebidConfig {
    adUnit: any;
    params?: Object;
    options?: Object;
    timeout: number;
}

/**
 * @typedef {Object} KPAdvertisingConfigObject@typedef {Object} KPAdvertisingConfigObject
 * @property {KPPrebidConfig} prebid - The prebid config.
 * @property {Array<KPAdBreakObject>} adBreaks - The ad breaks scheme.
 * @property {number} [playAdsAfterTime] - Only play ad breaks scheduled after this time (in seconds). This setting is strictly after - e.g. setting playAdsAfterTime to 15 will cause the player to ignore an ad break scheduled to play at 15s.
 * @property {boolean} [showAdBreakCuePoint] - Whether to show the ad breaks cue points.
 * @property {Object} [adBreakCuePointStyle] - Style options for the ad breaks cue points - See the options {@link https://github.com/kaltura/playkit-js-timeline/blob/main/docs/types.md#cuepointoptionsobject|Here}.
 */
export declare type KPAdvertisingConfigObject = {
    prebid?: KPPrebidConfig;
    adBreaks: Array<KPAdBreakObject>;
    playAdsAfterTime?: number;
    showAdBreakCuePoint?: boolean;
    adBreakCuePointStyle?: Object;
};

export declare type KPEventTypes = {
    Core: PKEventTypes;
    UI: typeof UIEventType;
    Cast: typeof CastEventType;
    Playlist: typeof PlaylistEventType;
    VISIBILITY_CHANGE: 'visibilitychange';
};

/**
 * @typedef {Object} KPMediaConfig@typedef {Object} KPMediaConfig
 * @property {ProviderMediaConfigSourcesObject} sources
 * @property {ProviderMediaConfigSessionObject} session
 * @property {{[plugin: string]: Object}} plugins
 */
export declare interface KPMediaConfig extends PlaybackConfig {
    sources: ProviderMediaConfigSourcesObject;
    session?: ProviderMediaConfigSessionObject;
    plugins?: {
        [plugin: string]: Object;
    };
}

/**
 * @typedef {Object} KPPlaylistItemConfigObject@typedef {Object} KPPlaylistItemConfigObject
 * @property {KPPlaylistCountdownOptions} [countdown] - Countdown options
 */
export declare type KPPlaylistItemConfigObject = {
    countdown?: PlaylistCountdownOptions;
};

/**
 * @typedef {Object} KPPlaylistObject@typedef {Object} KPPlaylistObject
 * @property {string} id - This is playlist's ID.
 * @property {ProviderPlaylistMetadataObject} metadata - This is the playlist metadata.
 * @property {KPPlaylistOptions} options - These are the playlist options.
 * @property {KPPlaylistCountdownOptions} countdown - This is the playlist countdown configuration.
 * @property {Array<PlaylistItem>} items - These are the playlist items.
 */
export declare interface KPPlaylistObject extends PlaylistConfigObject {
    id?: string;
    metadata?: ProviderPlaylistMetadataObject;
    poster?: string;
}

export declare interface KPPrebidConfig extends KPAdPrebidConfig {
    libUrl: string;
}

export declare type KPThumbnailConfig = {
    thumbsSprite: string;
    thumbsWidth: number;
    thumbsSlices: number;
};

export declare interface LegacyPartialKPOptionsObject {
    targetId: string;
    logLevel?: string;
    disableUserCache?: boolean;
    player?: any;
    provider: ProviderOptionsObject;
    ui?: UiConfig;
}

declare type ListenerType = (visible: boolean, reason: string) => any;

export declare interface LogConfig {
    playerVersion?: boolean;
    level: string;
    handler?: (messages: any[], context: Object) => void;
}

/**
 * @typedef {Object} MediaCapabilitiesObject
 */
export declare type MediaCapabilitiesObject = HEVCSupportedObject & DRMSupportedObject;

export declare interface MediaSourceOptionsObject {
    forceRedirectExternalStreams: boolean;
    redirectExternalStreamsHandler: () => void | undefined;
    redirectExternalStreamsTimeout: number | undefined;
}

export declare interface NetworkConfig {
    requestFilter?: () => void;
    responseFilter?: () => void;
    maxStaleLevelReloads: number;
}

export declare type PartialKPOptionsObject = Omit<KalturaPlayerConfig, 'productVersion'>;

export declare interface PKAdBreakOptions {
    type?: string;
    position?: number;
    numAds?: number;
}

export declare type PKAdBreakTypes = {
    [type: string]: string;
};

export declare interface PKAdOptions {
    system?: string;
    url?: string;
    contentType?: string;
    title?: string;
    position?: number;
    duration?: number;
    clickThroughUrl?: string;
    posterUrl?: string;
    skipOffset?: number;
    linear: boolean;
    width: number;
    height: number;
    bitrate: number;
    bumper: boolean;
    inStream?: boolean;
    vpaid?: boolean;
    streamId?: string;
    wrapperAdIds: Array<string>;
    wrapperCreativeIds: Array<string>;
    wrapperAdSystems: Array<string>;
}

export declare type PKAdTagTypes = {
    [type: string]: string;
};

export declare interface PlaybackConfig extends PKPlaybackConfigObject {
    autopause: boolean;
    loop: boolean;
}

export declare const PLAYER_NAME: string;

export declare const PLAYER_TYPE: string;

/**
 * @class PlayerSnapshot
 * @param {KalturaPlayer} player -  The Kaltura player.
 *
 */
declare class PlayerSnapshot {
    mediaInfo: ProviderMediaInfoObject;
    mediaConfig: KPMediaConfig;
    /**
     * @type {TextStyle}
     * @instance
     * @memberof PlayerSnapshot
     */
    textStyle: TextStyle;
    /**
     * @type {Object}
     * @instance
     * @memberof PlayerSnapshot
     */
    advertising: any;
    /**
     * @type {Object}
     * @instance
     * @memberof PlayerSnapshot
     */
    config: any;
    constructor(player: KalturaPlayer);
}

export declare const playlist: {
    PlaylistEventType: {
        readonly PLAYLIST_LOADED: "kaltura-player-playlistloaded";
        readonly PLAYLIST_ITEM_CHANGED: "kaltura-player-playlistitemchanged";
        readonly PLAYLIST_ENDED: "kaltura-player-playlistended";
    };
};

export declare interface PlaylistConfig {
    id: string;
    metadata: ProviderPlaylistMetadataObject;
    poster?: string;
    options?: PlaylistOptions;
    countdown?: PlaylistCountdownOptions;
    items: Array<PlaylistItem>;
}

export declare interface PlaylistConfigObject {
    options?: PlaylistOptions;
    countdown?: PlaylistCountdownOptions;
    items: Array<PlaylistItem>;
}

/**
 * @typedef {Object} KPPlaylistCountdownOptions@typedef {Object} KPPlaylistCountdownOptions
 * @property {number} [timeToShow] - Shows when the countdown is scheduled to appear (by default, this is towards the end).
 * @property {number} [duration=10] - Shows for how long the countdown will appear.
 * @property {boolean} [showing=true] - Determines whether to show the countdown.
 */
export declare interface PlaylistCountdownOptions {
    timeToShow?: number;
    duration: number;
    showing: boolean;
}

/**
 * @const {Object} PlaylistEventType
 *
 * @example
 * // Events lifecycle
 * 1. PLAYLIST_LOADED
 * 2. PLAYLIST_ITEM_CHANGED (multiple)
 * 3. PLAYLIST_ENDED
 * @example
 * // How to use
 * player.addEventListener(KalturaPlayer.playlist.PlaylistEventType.PLAYLIST_LOADED, e => {
 *   console.log(e.payload.playlist.metadata.name);
 * };
 */
declare const PlaylistEventType: {
    /**
     * Fires when the playlist has been loaded.
     * @event PLAYLIST_LOADED
     * @memberof PlaylistEventType
     */
    readonly PLAYLIST_LOADED: "kaltura-player-playlistloaded";
    /**
     * Fires when a playlist item start to changed.
     * @event PLAYLIST_ITEM_CHANGED
     * @memberof PlaylistEventType
     */
    readonly PLAYLIST_ITEM_CHANGED: "kaltura-player-playlistitemchanged";
    /**
     * Fires when the playlist has finished.
     * @event PLAYLIST_ENDED
     * @memberof PlaylistEventType
     */
    readonly PLAYLIST_ENDED: "kaltura-player-playlistended";
};

/**
 * @class PlaylistItem
 * @param {PKSourcesConfigObject} [sources] - The item sources
 * @param {KPPlaylistItemConfigObject} [config] - The item config
 */
declare class PlaylistItem {
    private _sources;
    private _config;
    private _plugins;
    private _index;
    constructor(sources: SourcesConfig, config: KPPlaylistItemConfigObject, index: number);
    /**
     * Update the playlist item sources
     * @param {PKSourcesConfigObject} sourcesObject - The sources
     * @returns {void}
     * @instance
     * @memberof PlaylistItem
     */
    updateSources(sourcesObject: SourcesConfig): void;
    /**
     * Update the playlist item plugins (e.g. bumper from BE)
     * @param {KPPluginsConfigObject} pluginsObject - The plugins
     * @returns {void}
     * @instance
     * @memberof PlaylistItem
     */
    updatePlugins(pluginsObject: PluginsConfig): void;
    /**
     * Playlist item sources
     * @type {?PKSourcesConfigObject}
     * @instance
     * @memberof PlaylistItem
     */
    get sources(): SourcesConfig;
    /**
     * Playlist item config
     * @type {?KPPlaylistItemConfigObject}
     * @instance
     * @memberof PlaylistItem
     */
    get config(): KPPlaylistItemConfigObject;
    /**
     * Playlist item plugins
     * @type {KPPluginsConfigObject}
     * @instance
     * @memberof PlaylistItem
     */
    get plugins(): PluginsConfig;
    /**
     * Playlist item index
     * @type {number}
     * @instance
     * @memberof PlaylistItem
     */
    get index(): number;
    /**
     * @returns {boolean} = Whether the playlist item has sources to play
     * @instance
     * @memberof PlaylistItem
     */
    isPlayable(): boolean;
}

/**
 * @class PlaylistManager
 * @param {KalturaPlayer} player - The player instance
 * @param {KPOptionsObject} options - The player config object
 */
declare class PlaylistManager {
    private static _logger;
    private readonly _player;
    private _eventManager;
    private _playlist;
    private readonly _options;
    private readonly _countdown;
    private _playerOptions;
    private _mediaInfoList;
    private _appPluginConfig;
    constructor(player: KalturaPlayer, options: KalturaPlayerConfig);
    /**
     * Config the playlist
     * @param {KPPlaylistObject} [config] - The playlist config
     * @param {ProviderEntryListObject} [entryList] - Entry list
     * @returns {void}
     * @instance
     * @memberof PlaylistManager
     */
    configure(config: KPPlaylistObject, entryList?: ProviderEntryListObject): void;
    /**
     * Load a playlist
     * @param {KPPlaylistObject} playlistData - The playlist data
     * @param {KPPlaylistConfigObject} [playlistConfig] - The playlist config
     * @param {ProviderEntryListObject} [entryList] - Entry list
     * @returns {void}
     * @instance
     * @memberof PlaylistManager
     */
    load(playlistData: ProviderPlaylistObject, playlistConfig: PlaylistConfigObject, entryList?: ProviderEntryListObject): void;
    /**
     * Reset the playlist
     * @returns {void}
     * @instance
     * @memberof PlaylistManager
     */
    reset(): void;
    /**
     * Play the next item
     * @returns {void}
     * @instance
     * @memberof PlaylistManager
     */
    playNext(): void;
    /**
     * Play the previous item
     * @returns {void}
     * @instance
     * @memberof PlaylistManager
     */
    playPrev(): void;
    /**
     * Play a specific item
     * @param {number} index - The index of the item to play
     * @returns {void}
     * @instance
     * @memberof PlaylistManager
     */
    playItem(index: number): void;
    /**
     * Playlist items
     * @type {Array<PlaylistItem>}
     * @instance
     * @memberof PlaylistManager
     */
    get items(): Array<PlaylistItem>;
    /**
     * Current item
     * @type {?PlaylistItem}
     * @instance
     * @memberof PlaylistManager
     */
    get current(): PlaylistItem | undefined;
    /**
     * Next item
     * @type {?PlaylistItem}
     * @instance
     * @memberof PlaylistManager
     */
    get next(): PlaylistItem | undefined;
    /**
     * Previous item
     * @type {?PlaylistItem}
     * @instance
     * @memberof PlaylistManager
     */
    get prev(): PlaylistItem | undefined;
    /**
     * Playlist id
     * @type {string}
     * @instance
     * @memberof PlaylistManager
     */
    get id(): string;
    /**
     * Playlist metadata
     * @type {ProviderPlaylistMetadataObject}
     * @instance
     * @memberof PlaylistManager
     */
    get metadata(): ProviderPlaylistMetadataObject;
    /**
     * Playlist poster
     * @type {?string}
     * @instance
     * @memberof PlaylistManager
     */
    get poster(): string | undefined;
    /**
     * Playlist countdown
     * @type {KPPlaylistCountdownOptions}
     * @instance
     * @memberof PlaylistManager
     */
    get countdown(): PlaylistCountdownOptions;
    /**
     * Playlist options
     * @type {KPPlaylistOptions}
     * @instance
     * @memberof PlaylistManager
     */
    get options(): PlaylistOptions;
    private _getMergedPlaylistData;
    private _addBindings;
    private _onPlaybackEnded;
    private _onChangeSourceStarted;
    private _setItem;
    private _resetProviderPluginsConfig;
    destroy(): void;
}

/**
 * @typedef {Object} KPPlaylistOptions@typedef {Object} KPPlaylistOptions
 * @property {boolean} [autoContinue=true] - Determines whether to continue to the next item automatically.
 * @property {boolean} [loop=false] - Determines whether to play the playlist in a loop. When selected, the playlist will play automatically even if autoContinue is set to false.
 */
export declare interface PlaylistOptions {
    autoContinue: boolean;
    loop: boolean;
    imageDuration: number;
}

/**
 * The logger of the PluginManager class.
 * @private
 * @const
 */
/** The PluginManager responsible for register plugins definitions and store plugins instances.
 * @classdesc
 */
declare class PluginManager {
    private static _logger;
    /**
     * The registry of the plugins.
     * Maps plugin's name to his class.
     * @type {Map}
     * @static
     * @private
     */
    private static _registry;
    /**
     * The active plugins in the player.
     * Maps plugin's name to his instance.
     * @type {Object}
     * @private
     */
    private _plugins;
    /**
     * Is disabled plugin map.
     * Maps plugin's name to a boolean.
     * false means the plugin is disable. true or plugin name doesn't exist in the map means the plugin is not disable.
     * @type {Map}
     * @private
     */
    private _isDisabledPluginMap;
    /**
     * Writes the plugin in the registry.
     * Maps: plugin name -> plugin class.
     * @param {string} name - The plugin name
     * @param {Function} handler - The plugin class
     * @returns {boolean} - If the registration request succeeded
     * @static
     * @public
     */
    static register(name: string, handler: () => any): boolean;
    /**
     * Removes the plugin from the registry.
     * @param {string} name - The plugin name
     * @static
     * @public
     * @returns {void}
     */
    static unRegister(name: string): void;
    /**
     * Creates and store new instance of the plugin in case isValid() of the plugin returns true.
     * @param {string} name - The plugin name
     * @param {Object} player - The player reference
     * @param {Object} [config={}] - The plugin configuration
     * @returns {boolean} - Whether the plugin load was successful
     * @public
     */
    load(name: string, player: any, config?: any): boolean;
    /**
     * Iterates over all the plugins and calls loadMedia().
     * @public
     * @returns {void}
     */
    loadMedia(): void;
    /**
     * Iterates over all the plugins and calls destroy().
     * @public
     * @returns {void}
     */
    destroy(): void;
    /**
     * Iterates over all the plugins and calls reset() method of the plugin's impl.
     * @public
     * @returns {void}
     */
    reset(): void;
    /**
     * Returns the plugin's instance.
     * @param {string} name - The plugin name.
     * @returns {BasePlugin} - The plugin instance.
     * @public
     */
    get(name: string): BasePlugin | undefined;
    /**
     * Returns all plugins.
     * @returns {Object} - All plugins.
     * @public
     */
    getAll(): {
        [name: string]: BasePlugin;
    };
}

export declare interface PluginsConfig {
    [plugin: string]: BasePlugin;
}

export declare interface PrebidConfig extends AdPrebidConfig {
    libUrl: string;
}

export { providers }

/**
 * Export the register method.
 * @type {function}
 * @constant
 */
export declare const registerPlugin: typeof PluginManager.register;

/**
 * @class RemoteAvailablePayload
 * @param {BaseRemotePlayer} player - The active remote player.
 * @param {boolean} available - Remote player availability.
 * @extends RemotePayload
 */
declare class RemoteAvailablePayload extends RemotePayload {
    private readonly _available;
    constructor(player: BaseRemotePlayer, available: boolean);
    /**
     * Remote player availability.
     * @type {boolean}
     * @instance
     * @memberof RemoteAvailablePayload
     */
    get available(): boolean;
}

/**
 * @class RemoteConnectedPayload
 * @param {BaseRemotePlayer} player - The active remote player.
 * @param {RemoteSession} session - The remote session.
 * @param {RemotePlayerUI} [ui] - Optional remote player UI preset.
 * @extends RemotePayload
 */
declare class RemoteConnectedPayload extends RemotePayload {
    private _ui;
    private _session;
    constructor(player: BaseRemotePlayer, session: RemoteSession, ui?: RemotePlayerUI);
    /**
     * Remote player UI preset.
     * @type {?RemotePlayerUI}
     * @instance
     * @memberof RemoteConnectedPayload
     */
    get ui(): RemotePlayerUI | undefined;
    /**
     * Remote session.
     * @type {RemoteSession}
     * @instance
     * @memberof RemoteConnectedPayload
     */
    get session(): RemoteSession;
}

/**
 * @class RemoteControl
 * @param {KalturaPlayer} player - The Kaltura player.
 */
declare class RemoteControl {
    static _logger: any;
    /**
     * Gets the player snapshot.
     * @returns {PlayerSnapshot} - player snapshot.
     * @memberof RemoteControl
     * @instance
     */
    getPlayerSnapshot: () => void;
    /**
     * Gets the UI wrapper.
     * @returns {UIWrapper} - The UI wrapper.
     * @memberof RemoteControl
     * @instance
     */
    getUIWrapper: () => void;
    /**
     * On remote device disconnected handler.
     * @param {RemoteDisconnectedPayload} payload - disconnected payload.
     * @returns {void}
     * @memberof RemoteControl
     * @instance
     */
    onRemoteDeviceDisconnected: () => void;
    /**
     * On remote device connected handler.
     * @param {RemoteConnectedPayload} payload - connected payload.
     * @returns {void}
     * @memberof RemoteControl
     * @instance
     */
    onRemoteDeviceConnected: () => void;
    /**
     * On remote device available handler.
     * @param {RemoteAvailablePayload} payload - available payload.
     * @returns {void}
     * @memberof RemoteControl
     * @instance
     */
    onRemoteDeviceAvailable: () => void;
    /**
     * On remote device connecting handler.
     * @returns {void}
     * @memberof RemoteControl
     * @instance
     * @fires CastEventType:CAST_SESSION_STARTING
     */
    onRemoteDeviceConnecting: () => void;
    /**
     * On remote device disconnecting handler.
     * @returns {void}
     * @memberof RemoteControl
     * @instance
     */
    onRemoteDeviceDisconnecting: () => void;
    /**
     * On remote device connect failed handler.
     * @returns {void}
     * @memberof RemoteControl
     * @instance
     */
    onRemoteDeviceConnectFailed: () => void;
    constructor(player: KalturaPlayer);
}

/**
 * @class RemoteDisconnectedPayload
 * @param {BaseRemotePlayer} player - The active remote player.
 * @param {PlayerSnapshot} snapshot - The remote player snapshot.
 * @extends RemotePayload
 */
declare class RemoteDisconnectedPayload extends RemotePayload {
    private readonly _snapshot;
    constructor(player: BaseRemotePlayer, snapshot: PlayerSnapshot);
    /**
     * Remote player snapshot.
     * @type {PlayerSnapshot}
     * @instance
     * @memberof RemoteDisconnectedPayload
     */
    get snapshot(): PlayerSnapshot;
}

/**
 * @class RemotePayload
 * @param {BaseRemotePlayer} player - The active remote player.
 */
declare class RemotePayload {
    private _player;
    constructor(player: BaseRemotePlayer);
    /**
     * The active remote player.
     * @type {BaseRemotePlayer}
     * @instance
     * @memberof RemotePayload
     */
    get player(): BaseRemotePlayer;
}

declare class RemotePlayerManager {
    private static _registry;
    private static _logger;
    private _remotePlayers;
    static register(type: string, remotePlayer: BaseRemotePlayer): void;
    load(castConfig: any, player: KalturaPlayer): void;
    startCasting(type?: string): Promise<any>;
    isCastAvailable(type?: string): boolean;
    destroy(): void;
    setIsCastInitiator(type: string, isCastInitiator: boolean): void;
    private _getRemotePlayer;
}

/**
 * @class RemotePlayerUI
 */
declare class RemotePlayerUI {
    private _uis;
    /**
     * Playback UI of the remote player.
     * @param {Object} props - UI creation parameters.
     * @returns {React$Element<any>} - Component.
     * @instance
     * @memberof RemotePlayerUI
     */
    playbackUI(props: any): any;
    /**
     * Idle UI of the remote player.
     * @param {Object} props - UI creation parameters.
     * @returns {React$Element<any>} - Component.
     * @instance
     * @memberof RemotePlayerUI
     */
    idleUI(props: any): any;
    /**
     * Idle UI of the remote player.
     * @param {Object} props - UI creation parameters.
     * @returns {React$Element<any>} - Component.
     * @instance
     * @memberof RemotePlayerUI
     */
    adsUI(props: any): any;
    /**
     * Live UI of the remote player.
     * @param {Object} props - UI creation parameters.
     * @returns {React$Element<any>} - Component.
     * @instance
     * @memberof RemotePlayerUI
     */
    liveUI(props: any): any;
    /**
     * Error UI of the remote player.
     * @param {Object} props - UI creation parameters.
     * @returns {React$Element<any>} - Component.
     * @instance
     * @memberof RemotePlayerUI
     */
    errorUI(props: any): any;
    /**
     * UI presets.
     * @type {Array<UIPreset>}
     * @instance
     * @memberof RemotePlayerUI
     */
    get uis(): UIPreset[];
}

/**
 * @class RemoteSession
 * @param {string} id - Session ID.
 * @param {string} friendlyName - Receiver friendly name.
 * @param {boolean} [resuming] - Whether the session is resuming.
 */
declare class RemoteSession {
    private readonly _id;
    private readonly _friendlyName;
    private readonly _resuming;
    constructor(id: string, friendlyName: string, resuming?: boolean);
    /**
     * Receiver friendly name.
     * @type {string}
     * @instance
     * @memberof RemoteSession
     */
    get deviceFriendlyName(): string;
    /**
     * Session ID.
     * @type {string}
     * @instance
     * @memberof RemoteSession
     */
    get id(): string;
    /**
     * Whether the session is resuming.
     * @type {?boolean}
     * @instance
     * @memberof RemoteSession
     */
    get resuming(): boolean | undefined;
}

/**
 * Setup the Kaltura Player.
 * @param {PartialKPOptionsObject|LegacyPartialKPOptionsObject} options - partial kaltura player options
 * @private
 * @returns {KalturaPlayer} - The Kaltura Player.
 */
declare function setup_2(options: PartialKPOptionsObject): KalturaPlayer;
export { setup_2 as setup }

export declare interface SourcesConfig extends Omit<ProviderMediaConfigSourcesObject, 'poster'> {
    thumbnails?: ExternalThumbnailsConfig;
    options: MediaSourceOptionsObject;
    startTime: number;
    imageSourceOptions?: ImageSourceOptions;
    poster?: string;
}

/**
 * @typedef {Object.<string; number>} SupportedOptionsType
     */
 export declare type SupportedOptionsType = {
     [supportedOption: string]: number;
 };

 declare class _TargetObserveredBinding {
     lastVisible: boolean;
     lastIntersectionRatio: number;
     threshold: number;
     listener: ListenerType;
     constructor(threshold: number, listener: ListenerType);
 }

 declare class TextStyleConverter {
     static toCastTextStyle(playerTextStyle: TextStyle): any;
     static toPlayerTextStyle(castTextStyle: any): TextStyle;
     static rgbToHex(rgb: Array<number>): string;
     static hexToRGB(hex: string): [number, number, number];
 }

 export { ui }

 export declare interface UiConfig extends UIOptionsObject {
     disable?: boolean;
     css?: string;
     customPreset?: {
         template: () => any;
         condition: () => any;
     }[];
 }

 /**
  * The logger of the UIWrapper class.
  * @private
  * @const
  */
 declare class UIWrapper {
     private static _logger;
     private _uiManager;
     private readonly _disabled;
     private _player;
     constructor(player: KalturaPlayer, options: KalturaPlayerConfig);
     destroy(): void;
     reset(): void;
     setConfig(config: any, componentAlias?: string): void;
     /**
      * Add a component dynamically
      *
      * @param {KPUIAddComponent} component - The component to add
      * @returns {Function} - Removal function
      */
     addComponent(component: any): () => void;
     /**
      * Remove a component dynamically
      *
      * @param {KPUIRemoveComponent} component - The component to remove
      * @returns {Function} - Undo removal function
      */
     removeComponent(component: any): () => void;
     get store(): any;
     /**
      * Deprecated - left for backward compatibility - use instead registerService in KalturaPlayer
      * @param {string} name - the manager name
      * @param {Object} manager - the manager object
      * @returns {void}
      */
     registerManager(name: string, manager: any): void;
     /**
      * Deprecated - left for backward compatibility - use instead getService in KalturaPlayer
      * @param {string} name - the manager name
      * @returns {Object} - the manager object
      */
     getManager(name: string): any | void;
     /**
      * Deprecated - left for backward compatibility - use instead hasService in KalturaPlayer
      * @param {string} name - the manager name
      * @returns {boolean} - if the manager exist
      */
     hasManager(name: string): boolean;
     setLoadingSpinnerState(show: boolean): void;
     private _resetErrorState;
     private _handleExternalCSS;
     private _handleVr;
     private _setStereoConfig;
 }

 export declare const VERSION: string;

 export declare interface ViewabilityConfig {
     observedThresholds: Array<number>;
     playerThreshold: number;
 }

 /**
  * A service class to observe viewability of elements in the view port.
  */
 declare class ViewabilityManager {
     private readonly _observer;
     private _targetsObserved;
     private _config;
     private _eventManager;
     private _visibilityTabChangeEventName;
     private _visibilityTabHiddenAttr;
     /**
      * Whether the player browser tab is active or not
      * @type {boolean}
      * @private
      */
     private _isTabVisible;
     /**
      * @param {number} viewabilityConfig - the configuration needed to create the manager
      * @constructor
      */
     constructor(viewabilityConfig?: ViewabilityConfig);
     private _intersectionChangedHandler;
     private _handleTabVisibilityChange;
     private _initTabVisibility;
     /**
      * @param {HTMLElement} target - the targeted element to check its visibility
      * @param {Function} listener - the callback to be invoked when visibility is changed (and when starting to observe). The callback is called with a boolean param representing the visibility state
      * @param {?number} optionalThreshold - a number between 0 to 100 that represents the minimum visible percentage considered as visible
      * @returns {void}
      */
     observe(target: HTMLElement, listener: ListenerType, optionalThreshold?: number): void;
     /**
      * Remove the listener from the target
      * @param {HTMLElement} target - the targeted element to remove the listener
      * @param {Function} listener - the callback function to be removed
      * @returns {void}
      */
     unObserve(target: HTMLElement, listener: _TargetObserveredBinding): void;
     /**
      * cleans all memory allocations.
      * @override
      */
     destroy(): void;
 }

 declare const ViewabilityType: {
     readonly VIEWPORT: "viewport";
     readonly TAB: "tab";
 };

 export { }
