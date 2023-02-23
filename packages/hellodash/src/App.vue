<script setup lang="ts">
import createAuth0Client from '@auth0/auth0-spa-js';
import { User } from '@didyoumeantoast/hellodash-models';
import { onMounted, onUnmounted, ref } from 'vue';
import { refreshAuthToken } from './api/auth0-api';
import Hellodash from './components/Hellodash.vue';
import { CONSTANTS } from './constants';
import { hellodashService } from './services/hellodash-service';
import { setCurrentUser, setMobileView } from './slices/app-state-slice';
import { dispatch, store } from './store';

//#region Local properties

/** Callback when the window is resized. Need to keep a reference to it so we can remove it later. */
let windowResizeCallback: (e: UIEvent) => void;

//#endregion

//#region Refs

/** The root state of the app */
const rootState = ref(store.getState());

/** Whether the app state has been loaded */
const isAppStateLoaded = ref(false);

//#endregion

//#region Lifecycle methods

onMounted(async () => {
  // Create auth0 client
  const authClient = await createAuth0Client({
    domain: CONSTANTS.AUTH0_DOMAIN,
    client_id: CONSTANTS.AUTH0_CLIENTID,
    audience: CONSTANTS.AUTH0_AUDIENCE,
    useRefreshTokens: true,
  });
  hellodashService.authClient = authClient;

  // Set initial state and listen for changes
  rootState.value = store.getState();
  store.subscribe(() => {
    rootState.value = store.getState();
  });

  // Update mobile view and listen for changes when the window is resized
  updateMobileView();
  windowResizeCallback = () => {
    updateMobileView();
  };
  window.addEventListener('resize', windowResizeCallback);

  // State is loaded
  isAppStateLoaded.value = true;
});

onUnmounted(() => {
  // Remove window resize listener
  windowResizeCallback && window.removeEventListener('resize', windowResizeCallback);
});

//#endregion

//#region Methods

/**
 * Update the mobile view state if the window size has changed.
 */
function updateMobileView() {
  const mobileView = rootState.value.appState.mobileView;
  if ((document.body.clientWidth < 600 && !mobileView) || (document.body.clientWidth >= 600 && mobileView)) {
    dispatch(setMobileView(!mobileView));
  }
}

// TODO: listen for refresh token

/**
 * Called when the user has signed in. Sets the current user in the store based on the auth client.
 */
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

//#endregion
</script>

<template>
  <hellodash-auth0-provider
    v-if="isAppStateLoaded"
    :authClient="hellodashService.authClient"
    @hellodashAuth0ProviderSignedIn="userSignedIn"
    @hellodashAuth0ProviderRefreshToken="() => refreshAuthToken(hellodashService.authClient)"
  >
    <Hellodash v-if="!rootState.appState.error && rootState.appState.currentUser" :rootState="rootState"></Hellodash>
    <div v-if="rootState.appState.error" class="root-error-message">Oops! Something went wrong...</div>
  </hellodash-auth0-provider>

  <dash-loader v-if="!isAppStateLoaded"></dash-loader>
</template>

<style>
.root-error-message {
  margin-top: var(--dash-spacing-48);
  text-align: center;
  font-size: var(--dash-font-size-6);
}
</style>
