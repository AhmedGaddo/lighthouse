/**
 * @license Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const MetricArtifact = require('./metric');
const LHError = require('../../../lib/lh-error');

class FirstMeaningfulPaint extends MetricArtifact {
  get name() {
    return 'FirstMeaningfulPaint';
  }

  /**
   * @param {LH.Artifacts.MetricComputationData} data
   * @return {Promise<LH.Artifacts.Metric>}
   */
  async computeObservedMetric(data) {
    const {traceOfTab} = data;
    if (!traceOfTab.timestamps.firstMeaningfulPaint) {
      throw new LHError(LHError.errors.NO_FMP);
    }

    return {
      // FMP established as existing, so cast
      timing: /** @type {number} */ (traceOfTab.timings.firstMeaningfulPaint),
      timestamp: traceOfTab.timestamps.firstMeaningfulPaint,
    };
  }
}

module.exports = FirstMeaningfulPaint;
