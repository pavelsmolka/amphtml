/**
 * Copyright 2015 The AMP HTML Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * @fileoverview Shows a Pinterest widget.
 * Examples:
 * <code>
 *
 * <amp-pinterest height=20 width=40
 *   data-do="buttonPin"
 *   data-url="http://www.flickr.com/photos/kentbrew/6851755809/"
 *   data-media="http://farm8.staticflickr.com/7027/6851755809_df5b2051c9_z.jpg"
 *   data-description="Next stop: Pinterest">
 * </amp-pinterest>
 *
 * <amp-pinterest width=245 height=330
 *   data-do="embedPin"
 *   data-url="https://www.pinterest.com/pin/99360735500167749/">
 * </amp-pinterest>
 *
 * </code>
 */

import {CSS} from '../../../build/amp-pinterest-0.1.css';
import {isLayoutSizeDefined} from '../../../src/layout';
import {user} from '../../../src/log';
import {computeInMasterFrame, loadScript} from '../../../3p/3p';

import {Widget} from './widget';

/**
 * AMP Pinterest
 * @attr data-do
 *    - buttonPin: Pin It button
 *    - buttonFollow: User follow button
 */
class AmpHawk extends AMP.BaseElement {

    constructor(element) {
        super(element);
        this.trdLoaded = false;
    }

    /** @override */
    preconnectCallback(onLayout) {
        // // This domain serves the actual tweets as JSONP.
        // this.preconnect.url('https://syndication.twitter.com', onLayout);
        // // All images
        // this.preconnect.url('https://pbs.twimg.com', onLayout);
        // Hosts the script that renders tweets.
        this.preconnect.prefetch('http://widgets.future-hawk-content.co.uk/js/w/trd.js', 'script');
        // prefetchBootstrap(this.getWin());

        var win = this.element.ownerDocument.defaultView;

        console.log(this.trdLoaded);
        if (!this.trdLoaded) {
            this.trdLoaded = true;
            loadScript(win, 'http://widgets.future-hawk-content.co.uk/js/w/trd.js', () => {
                console.log('TRD is loaded now');
            });
        }


    }

    /** @override */
    isLayoutSupported(layout) {
        return isLayoutSizeDefined(layout);
    }

    /** @override */
    layoutCallback() {

        const widgetType = user.assert(this.element.getAttribute('data-widget-type'),
            'The data-widget-type attribute is required for <amp-hawk> %s', this.element);

        const modelName = user.assert(this.element.getAttribute('data-model-name'),
            'The data-model-name attribute is required for <amp-hawk> %s', this.element);

        return this.render(modelName, widgetType).then(node => {
            return this.element.appendChild(node);
        }).catch(err => {
            console.error('Will is right', err);
        });

    }

    render(modelName, widgetType = 'review') {

        return new Widget(this.element).render(modelName, widgetType);
        // return Promise.resolve('Invalid selector: ', selector);
    }

};

AMP.registerElement('amp-hawk', AmpHawk, CSS);
