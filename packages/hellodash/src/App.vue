<script setup lang="ts">
import createAuth0Client from '@auth0/auth0-spa-js';
import { User } from '@didyoumeantoast/hellodash-models';
import { onMounted, onUnmounted, ref } from 'vue';
import { CONSTANTS } from './constants';
import { hellodashService } from './services/hellodash-service';
import { setCurrentUser, setMobileView } from './slices/app-state-slice';
import { dispatch, store } from './store';

let windowResizeCallback: (e: UIEvent) => void;

const rootState = ref(store.getState());
const isAppStateLoaded = ref(false);

onMounted(async () => {
  const authClient = await createAuth0Client({
    domain: CONSTANTS.AUTH0_DOMAIN,
    client_id: CONSTANTS.AUTH0_CLIENTID,
    audience: CONSTANTS.AUTH0_AUDIENCE,
    useRefreshTokens: true,
  });
  hellodashService.authClient = authClient;

  rootState.value = store.getState();
  store.subscribe(() => {
    rootState.value = store.getState();
  });

  isAppStateLoaded.value = true;
});

onUnmounted(() => {
  windowResizeCallback = () => {
    updateMobileView();
  };
  window.addEventListener('resize', windowResizeCallback);

  updateMobileView();
});

function updateMobileView() {
  const mobileView = rootState.value.appState.mobileView;
  if ((document.body.clientWidth < 600 && !mobileView) || (document.body.clientWidth >= 600 && mobileView)) {
    dispatch(setMobileView(!mobileView));
  }
}

// listen for refresh token

// change route when note card is selected

// listen for logout event

async function userSignedIn() {
  const auth0User = await hellodashService.authClient.getUser();
  if (!auth0User) {
    return;
  }

  const user: User = {
    id: 0,
    givenName: auth0User.given_name,
    familyName: auth0User.family_name,
    picture: auth0User.picture,
    email: auth0User.email,
    userId: auth0User.sub as string,
    created: new Date().toISOString(),
  };
  dispatch(setCurrentUser(user));
}
</script>

<template>
  <hellodash-auth0-provider v-if="isAppStateLoaded" :authClient="hellodashService.authClient" @hellodashAuth0ProviderSignedIn="userSignedIn">
    <hellodash-app v-if="!rootState.appState.error && rootState.appState.currentUser" :rootState="rootState"></hellodash-app>
    <div v-if="rootState.appState.error" class="root-error-message">Oops! Something went wrong...</div>
  </hellodash-auth0-provider>

  <dash-loader v-if="!isAppStateLoaded"></dash-loader>
</template>

<style scoped>
.root-error-message {
  margin-top: var(--dash-spacing-48);
  text-align: center;
  font-size: var(--dash-font-size-6);
}
</style>
