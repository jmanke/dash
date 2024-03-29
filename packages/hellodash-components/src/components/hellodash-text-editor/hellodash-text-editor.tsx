import { Focusable } from '@didyoumeantoast/dash-components';
import { spaceConcat, wait } from '@didyoumeantoast/dash-utils';
import { Theme } from '@didyoumeantoast/hellodash-models';
import { checklist } from '@didyoumeantoast/tinymce-plugins';
import { Component, Element, Event, EventEmitter, getAssetPath, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { debounce, DebouncedFunc } from 'lodash';
import tinymce, { Editor, RawEditorSettings } from 'tinymce';
import { v4 as uuidv4 } from 'uuid';

const MIN_EDITOR_HEIGHT = 230;

@Component({
  tag: 'hellodash-text-editor',
  styleUrl: 'hellodash-text-editor.css',
})
export class HellodashTextEditor implements Focusable {
  //#region Own properties

  /** TinyMCE editor instance */
  editor: Editor;

  /** Unique ID for the editor */
  id: string;

  /** Input element reference */
  headingInput: HTMLInputElement;

  /** Debounced function to handle content changes */
  contentChangedHandler: DebouncedFunc<() => void>;

  /**
   * Returns `true` if loading
   */
  get isLoading() {
    return this.isEditorLoading || this.loading;
  }

  //#endregion

  //#region @Element

  @Element() element: HTMLHellodashTextEditorElement;

  //#endregion

  //#region @State

  /** `true` when the editor is in fullscreen mode */
  @State() isFullscreen = false;

  /** `true` when the editor is loading */
  @State() isEditorLoading = true;

  //#endregion

  //#region @Prop

  /**
   * The content of the editor
   */
  @Prop() content: string;

  /**
   * The theme of the editor
   * @default 'dark'
   */
  @Prop({ reflect: true }) theme: Theme = 'dark';
  @Watch('theme')
  themeChanged(theme: Theme, prevTheme: Theme) {
    if (theme === prevTheme) {
      return;
    }

    this.loadTinyMce();
  }

  /**
   * The heading of the editor
   */
  @Prop({ reflect: true }) heading: string;

  /**
   * The debounce time in milliseconds for content changes
   * @default 3000
   */
  @Prop({ reflect: true }) debounce: number = 3000;

  /**
   * When `true`, the editor will resize to fit the content
   * @default true
   */
  @Prop({ reflect: true }) resize?: boolean = true;

  /**
   * When `true`, the editor will show the title input
   * @default false
   */
  @Prop({ reflect: true }) showTitleInput: boolean;

  /**
   * When `true`, the editor will show the fullscreen button
   * @default false
   */
  @Prop({ reflect: true }) showFullscreen: boolean;

  /**
   * When `true`, the editor is loading and will show a loading indicator
   */
  @Prop({ reflect: true }) loading: boolean;
  @Watch('loading')
  loadingChanged() {
    if (this.loading || this.editor) {
      return;
    }

    this.loadTinyMce();
  }

  /**
   * When `true`, the editor will be readonly
   */
  @Prop({ reflect: true }) readonly: boolean;
  @Watch('readonly')
  readonlyChanged() {
    this.loadTinyMce();
  }

  //#endregion

  //#region @Event

  @Event({ eventName: 'hellodashTextEditorContentChanged' }) contentChanged: EventEmitter<string>;

  @Event({ eventName: 'hellodashTextEditorHeadingChanged' }) headingChanged: EventEmitter<string>;

  @Event({ eventName: 'hellodashTextEditorFullscreenChanged' }) fullscreenChanged: EventEmitter<boolean>;

  @Event({ eventName: 'hellodashTextEditorInit' }) editorInit: EventEmitter<HTMLHellodashTextEditorElement>;

  @Event({ eventName: 'hellodashTextEditorBeforeUnload' }) beforeUnload: EventEmitter<Promise<unknown>[]>;

  @Event({ eventName: 'hellodashTextEditorUnload' }) editorUnloaded: EventEmitter;

  @Event({ eventName: 'hellodashTextEditorIsDirty' }) isDirtyChanged: EventEmitter;

  @Event({ eventName: 'hellodashTextEditorNodeChanged' }) nodeChanged: EventEmitter<object>;

  //#endregion

  //#region Component lifecycle

  componentWillLoad() {
    this.id = `dash-text-editor-${uuidv4()}`;
  }

  componentDidLoad() {
    this.contentChangedHandler = debounce(() => {
      try {
        this.save();
      } catch (error) {
        console.error(error);
      }
    }, this.debounce);

    // if we're not initially loading, load the editor
    if (!this.loading) {
      this.loadTinyMce();
    }
  }

  disconnectedCallback() {
    this.editor?.remove();
  }

  //#endregion

  //#region Listeners
  //#endregion

  //#region @Method

  /**
   * Focuses the editor
   */
  @Method()
  async setFocus() {
    // wait for elements to be rendered
    await wait(60);
    if (this.headingInput) {
      this.headingInput.focus();
    } else {
      this.editor.execCommand('mceFocus', false);
    }
  }

  /**
   * Selects the title input
   */
  @Method()
  async selectTitle() {
    if (this.headingInput) {
      this.headingInput.select();
    }
  }

  /**
   * Returns true if the editor is dirty
   * @returns true if the editor is dirty
   */
  @Method()
  async isEditorDirty() {
    if (!this.editor) {
      throw Error('Editor must be defined');
    }

    return !this.editor.isNotDirty;
  }

  /**
   * Saves the editor content
   * @param emitEvent whether to emit the contentChanged event
   */
  @Method()
  async save(emitEvent: boolean = true) {
    if (!this.editor) {
      throw Error('Editor must be defined');
    }

    if (this.editor.isNotDirty) {
      return;
    }

    this.editor.save();

    if (emitEvent) {
      const content = await this.getContent();
      this.contentChanged.emit(content);
    }
  }

  /**
   * Sets the editor heading
   * @param heading the heading to set
   */
  @Method()
  async setHeading(heading: string) {
    if (!this.headingInput) {
      return;
    }

    this.headingInput.value = heading;
  }

  /**
   * Sets the editor content
   * @param content the content to set
   */
  @Method()
  async setContent(content: string) {
    this.editor.setContent(content);
    this.editor.undoManager.clear();
  }

  /**
   * Returns the editor content
   * @returns the editor content
   */
  @Method()
  async getContent() {
    if (!this.editor) {
      throw Error('Editor must be defined');
    }

    return this.editor.getContent();
  }

  /**
   * Returns the editor content as text
   * @returns the editor content as text
   */
  @Method()
  async getTextContent() {
    if (!this.editor) {
      throw Error('Editor must be defined');
    }

    return this.editor.getContent({ format: 'text' });
  }

  //#endregion

  //#region Local methods

  /**
   * Unloads the current editor
   */
  async unloadEditor() {
    if (this.editor) {
      const listeners = [];
      this.beforeUnload.emit(listeners);

      // allow listeners to perform their respective tasks before unloading the editor
      if (listeners.length) {
        await Promise.all(listeners);
      }

      // remove current editor before loading a new one
      await new Promise<void>(resolve => {
        this.editor.on('detach', () => resolve());
        try {
          this.editor.remove();
        } catch (e) {}
      });
      this.editor = null;

      this.editorUnloaded.emit();
    }
  }

  /**
   * Loads the TinyMCE editor
   */
  async loadTinyMce() {
    this.isEditorLoading = true;
    await this.unloadEditor();

    const theme = this.theme;
    const editors = await this.initTinyMce(theme);
    this.editor = editors[0];
    this.editor.setContent(this.content);
    this.editor.undoManager.clear();
    this.editor.on('input', () => this.contentChangedHandler());

    const tinyMceEditorElement = this.element.querySelector('.tox-tinymce') as HTMLElement;
    tinyMceEditorElement.style.removeProperty('height');

    if (this.showTitleInput) {
      this.createHeadingInput();
    }

    if (this.showFullscreen) {
      this.createFullscreenButton();
    }

    this.isEditorLoading = false;
    this.editorInit.emit(this.element);
  }

  /**
   * Initialises the TinyMCE editor
   * @param theme the theme to use
   * @returns the TinyMCE editor
   */
  initTinyMce(theme: string) {
    // add custom plugins
    tinymce.PluginManager.add('checklist', checklist);

    const sharedConfig: RawEditorSettings = {
      target: this.element.querySelector(`#${this.id}`),
      importcss_append: true,
      /* and here's our custom image picker*/
      content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:14px; color: ${
        theme === 'dark' ? '#ffffff' : '#000000'
      }; } a { color: rgb(88, 166, 255); } .mce-content-body [data-mce-selected="inline-boundary"] { background-color: ${theme === 'dark' ? '#000000' : '#b4d7ff'} }`,
      skin_url: theme === 'dark' ? getAssetPath('./assets/tinymce/skins/ui/dark') : undefined,
      resize: this.resize,
      min_height: MIN_EDITOR_HEIGHT,
    };

    let config: RawEditorSettings;

    if (this.readonly) {
      config = {
        ...sharedConfig,
        readonly: true,
        menubar: false,
        toolbar: false,
      };
    } else {
      config = {
        ...sharedConfig,
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        toolbar_mode: 'sliding',
        paste_data_images: true,
        /* enable automatic uploads of images represented by blob or data URIs*/
        automatic_uploads: true,
        toolbar_sticky: true,
        image_advtab: true,
        menubar: 'view insert format table',
        toolbar:
          'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | insertfile image media link codesample | forecolor backcolor removeformat | pagebreak | charmap emoticons | code',
        plugins:
          'paste nonbreaking importcss searchreplace autolink directionality code visualblocks visualchars image link media template codesample table charmap hr pagebreak nonbreaking toc insertdatetime advlist lists checklist wordcount imagetools textpattern noneditable help charmap quickbars emoticons code',
        nonbreaking_force_tab: true,
        fontsize_formats: '8px 10px 12px 14px 18px 24px 36px',
        file_picker_callback: function (cb) {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          /*
        Note: In modern browsers input[type="file"] is functional without
        even adding it to the DOM, but that might not be the case in some older
        or quirky browsers like IE, so you might want to add it to the DOM
        just in case, and visually hide it. And do not forget do remove it
        once you do not need it anymore.
      */

          input.onchange = function () {
            // @ts-ignore
            const file = this.files[0];

            const reader = new FileReader();
            reader.onload = function () {
              /*
            Note: Now we need to register the blob in TinyMCEs image blob
            registry. In the next release this part hopefully won't be
            necessary, as we are looking to handle it internally.
          */
              const id = 'blobid' + new Date().getTime();
              const blobCache = tinymce.activeEditor.editorUpload.blobCache;
              // @ts-ignore
              const base64 = reader.result.split(',')[1];
              const blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              /* call the callback and populate the Title field with the file name */
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        setup: ed => {
          ed.on('change', () => {
            this.contentChangedHandler();
          });
          ed.on('dirty', () => {
            this.isDirtyChanged.emit(true);
          });
          ed.on('nodeChange', e => {
            this.nodeChanged.emit(e);
          });
        },
      };
    }

    return tinymce.init(config);
  }

  /**
   * Creates the heading input
   */
  createHeadingInput() {
    const tinyMceHeaderElement = this.element.querySelector('.tox-editor-header');
    // create custom input for heading
    const headingInput = document.createElement('input') as HTMLInputElement;
    headingInput.classList.add('tox-heading-input');
    headingInput.placeholder = 'Title';
    headingInput.addEventListener('change', (e: any) => {
      this.headingChanged.emit(e.currentTarget.value);
      this.isDirtyChanged.emit(true);
    });
    headingInput.addEventListener('keypress', (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        this.editor.focus();
      }
    });

    if (this.readonly) {
      headingInput.setAttribute('readonly', 'true');
    }

    headingInput.value = this.heading;
    tinyMceHeaderElement.appendChild(headingInput);
    this.headingInput = headingInput;
  }

  /**
   * Creates the fullscreen button
   */
  createFullscreenButton() {
    const menuBarElement = this.element.querySelector('.tox-menubar');

    if (!menuBarElement) {
      setTimeout(() => {
        this.createFullscreenButton();
      }, 0);
      return;
    }

    const range = document.createRange();
    range.selectNode(document.getElementsByTagName('div').item(0));

    const fullscreenBtn =
      '<button aria-label="Fullscreen" title="Fullscreen" type="button" tabindex="-1" class="tox-tbtn tox-fullscreen-btn"><span class="tox-icon tox-tbtn__icon-wrap"><svg width="24" height="24" focusable="false"><path d="M15.3 10l-1.2-1.3 2.9-3h-2.3a.9.9 0 110-1.7H19c.5 0 .9.4.9.9v4.4a.9.9 0 11-1.8 0V7l-2.9 3zm0 4l3 3v-2.3a.9.9 0 111.7 0V19c0 .5-.4.9-.9.9h-4.4a.9.9 0 110-1.8H17l-3-2.9 1.3-1.2zM10 15.4l-2.9 3h2.3a.9.9 0 110 1.7H5a.9.9 0 01-.9-.9v-4.4a.9.9 0 111.8 0V17l2.9-3 1.2 1.3zM8.7 10L5.7 7v2.3a.9.9 0 01-1.7 0V5c0-.5.4-.9.9-.9h4.4a.9.9 0 010 1.8H7l3 2.9-1.3 1.2z" fill-rule="nonzero"></path></svg></span></button>';
    const documentFragment = range.createContextualFragment(fullscreenBtn);
    menuBarElement.appendChild(documentFragment);

    const fullscreenBtnElement = this.element.querySelector('.tox-fullscreen-btn');
    fullscreenBtnElement.addEventListener('click', e => {
      this.isFullscreen = !this.isFullscreen;
      (e.currentTarget as HTMLElement).blur();

      this.fullscreenChanged.emit(this.isFullscreen);
    });
  }

  //#endregion

  render() {
    return (
      <Host class={spaceConcat(this.isFullscreen && 'fullscreen', this.isLoading && 'loading')}>
        {this.isLoading && <dash-loader></dash-loader>}
        <div class={this.isEditorLoading ? 'text-editor-loading' : undefined} id={this.id}></div>
      </Host>
    );
  }
}
