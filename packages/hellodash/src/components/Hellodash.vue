<script setup lang="ts">
import { Label } from '@didyoumeantoast/hellodash-models';
import { onMounted, ref, watch } from 'vue';
import { hellodashService } from '../services/hellodash-service';
import { setSidebarCollapsed, setTheme, toggleSidebarCollapsed } from '../slices/app-settings-slice';
import { setError } from '../slices/app-state-slice';
import { getLabels, createLabel as createLabelAction, deleteLabel, updateLabel } from '../slices/labels-slice';
import { getNotePreviews } from '../slices/notes-slice';
import { dispatch, RootState } from '../store';
import { isNone } from '@didyoumeantoast/dash-utils';
import { Routes } from '../common/routes';
import { useRoute, useRouter } from 'vue-router';
import { logout } from '../utils/logout';

const LogoPath: string = './icon/pomeranian.svg';

const { rootState } = defineProps<{ rootState: RootState }>();

const selectedLabelId = ref<number | null>(null);
const isEditingLabels = ref(false);
const isCreatingLabel = ref(false);
const isInitialized = ref(false);
const route = useRoute();
const router = useRouter();

watch(route, () => {
  isEditingLabels.value = false;
  setSelectedLabel();
});

onMounted(async () => {
  try {
    await Promise.all([dispatch(getNotePreviews()), dispatch(getLabels())]);
    isInitialized.value = true;
  } catch (error) {
    console.error(error);
    dispatch(setError(true));
  }
});

function navigateTo(url: string) {
  if (rootState.appState.mobileView && !rootState.appSettings.sidebarCollapsed) {
    dispatch(setSidebarCollapsed(true));
  }

  router.push(url);
}

function selectLabel(label: Label) {
  if (label.id === selectedLabelId.value) {
    return;
  }

  navigateTo(`${Routes.label}/${label.id}`);
}

function setSelectedLabel() {
  const path = route.path;
  if (isNone(path)) {
    selectedLabelId.value = null;
    return;
  }

  const pattern = /(\/label\/)([0-9]+)/gm;
  const labelId = pattern.exec(path as string)?.[2];
  selectedLabelId.value = !!labelId ? parseInt(labelId) : null;
}

function editLabels() {
  if (rootState.appState.mobileView && !rootState.appSettings.sidebarCollapsed) {
    dispatch(setSidebarCollapsed(true));
  }
  isEditingLabels.value = true;
}

async function createLabel(label: Label) {
  isCreatingLabel.value = true;

  try {
    await dispatch(createLabelAction(label));
  } finally {
    isCreatingLabel.value = false;
  }
}
</script>

<template>
  <dash-shell v-if="isInitialized">
    <hellodash-nav-bar slot="header" @hellodashMenuToggled="() => dispatch(toggleSidebarCollapsed())">
      <img :src="LogoPath" alt="Hellodash logo" width="48" height="48" />
      <span class="logo-header">Hellodash</span>

      <dash-theme-toggle
        slot="content-end"
        class="theme-toggle"
        :theme="rootState.appSettings.theme"
        @dashThemeToggleChange="(e: any) => dispatch(setTheme(e.target.theme))"
      ></dash-theme-toggle>
      <hellodash-profile-settings
        slot="content-end"
        :user="rootState.appState.currentUser"
        :authClient="hellodashService.authClient"
        @hellodashProfileSettingsLogout="logout(hellodashService.authClient)"
      ></hellodash-profile-settings>
    </hellodash-nav-bar>

    <dash-side-bar slot="left-panel" :collapsed="rootState.appSettings.sidebarCollapsed" @dashSideBarClose="() => dispatch(setSidebarCollapsed(true))">
      <dash-sidebar-button
        icon="journal-text"
        text="Notes"
        :active="route.path === '/' || route.path === Routes.home"
        :collapsed="rootState.appSettings.sidebarCollapsed"
        @click="() => navigateTo(Routes.home)"
      ></dash-sidebar-button>
      <dash-sidebar-button
        v-for="label in rootState.labels"
        :key="label.id"
        icon="tag-fill"
        :active="selectedLabelId === label.id"
        :text="label.text"
        :iconColor="label.color"
        :collapsed="rootState.appSettings.sidebarCollapsed"
        @click="() => selectLabel(label)"
      ></dash-sidebar-button>
      <dash-sidebar-button icon="pencil" text="Edit labels" :collapsed="rootState.appSettings.sidebarCollapsed" @click="editLabels"></dash-sidebar-button>
      <dash-sidebar-button
        icon="trash3"
        text="Bin"
        :active="route.path === Routes.bin"
        :collapsed="rootState.appSettings.sidebarCollapsed"
        @click="() => navigateTo(Routes.bin)"
      ></dash-sidebar-button>
    </dash-side-bar>

    <main slot="content">
      <router-view />
    </main>
  </dash-shell>

  <dash-loader v-if="!isInitialized"></dash-loader>

  <hellodash-edit-labels
    v-if="isEditingLabels"
    :labels="rootState.labels"
    :creatingLabel="isCreatingLabel"
    @dashModalClosed="() => (isEditingLabels = false)"
    @hellodashEditLabelsCreateLabel="(e: any) => createLabel(e.detail)"
    @hellodashEditLabelsDeleteLabel="(e: any) => dispatch(deleteLabel(e.detail))"
    @hellodashEditLabelsUpdateLabel="(e: any) => dispatch(updateLabel(e.detail))"
  ></hellodash-edit-labels>
</template>

<style scoped>
dash-shell {
  overflow: hidden;
}

dash-side-bar dash-sidebar-button:not(last-child) {
  margin-bottom: var(--dash-spacing-1);
}

.logo-header {
  font-size: var(--dash-font-size-6);
  cursor: default;
}

@media only screen and (max-width: 600px) {
  .logo-header {
    font-size: var(--dash-font-size-4);
  }
}
</style>
