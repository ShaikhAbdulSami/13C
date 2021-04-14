#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LollyServerStack } from '../lib/lolly_server-stack';

const app = new cdk.App();
new LollyServerStack(app, 'LollyServerStack');
