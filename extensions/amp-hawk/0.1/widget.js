/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
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

import {xhrFor} from '../../../src/xhr';

/**
 * Hawk Widget
 * @attr data-widget-type: widget type to render (review, inbody, comparison, ...)
 * @attr data-model-name: model name to render
 */
export class Widget {

    /** @param {!Element} rootElement */
    constructor(rootElement) {
        // user.assert(rootElement.getAttribute('data-url'),
        //     'The data-url attribute is required for Pin widgets');
        this.element = rootElement;
        this.xhr = xhrFor(rootElement.ownerDocument.defaultView);

    }

    // /**
    //  * @returns {Promise}
    //  */
    // fetchData(modelName) {
    //     const url = `http://search-api.fie.future.net.uk/widget.php?id=review&model_name=${modelName}`;
    //     return this.xhr.fetchJson(url);
    // }

    renderWidget(modelName, widgetType) {

        // this.width = this.element.getAttribute('data-width');

        const structure = this.element.ownerDocument.createElement('div');
        structure.className = 'hawk-widget-insert';
        structure.dataset.widgetType = widgetType;
        structure.dataset.modelName = modelName;

        // done
        return structure;
    }

    render(modelName, widgetType) {

        // let dataFetch = this.fetchData();
        let dataFetch = Promise.resolve();
        return dataFetch.then(this.renderWidget.bind(this, modelName, widgetType));
    }

};
