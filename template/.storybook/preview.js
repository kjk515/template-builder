
import '../public/static/css/main.8a099abe.chunk.css';
import '../public/static/css/3.c86585d8.chunk.css';

import configurePreview from '@nara.platform/storybook/storyConfig/configurePreview';
import { addDecorator } from '@storybook/react';
import 'mobx-react/batchingForReactDom';
import { configure } from 'mobx';
import moment from 'moment';

import React from 'react';
import { Provider } from 'mobx-react';
import { NaraService } from '@nara.platform/accent';
import { ReactApp, AuthorizableApp } from '@nara.platform/react-ui';
import { store } from '@nara.drama/timecard';


configure({
  enforceActions: 'observed',
  isolateGlobalState: true,
});

NaraService.configure('somad-club', 'somad-club-user');
moment.locale('ko');

const authority = {
  // email: 'hhkim@nextree.io',  // 'jsseo@nextree.io'
  email: 'test1@test.com',
  cineroomId: 'ne3-m1-c4',
  roles: ['Admin', 'User'],
}

configurePreview(() => {
  //
  addDecorator(storyFn => (
    <Provider
      {...store}
    >
      <ReactApp>
        <AuthorizableApp
          env={AuthorizableApp.EnvType.DevToDev}
          devAuthority={authority}
        >
          {storyFn()}
        </AuthorizableApp>
      </ReactApp>
    </Provider>
  ));
});
