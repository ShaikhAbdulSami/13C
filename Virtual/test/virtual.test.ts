import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as Virtual from '../lib/virtual-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Virtual.VirtualStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
