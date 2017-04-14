import { OnInit, Directive, OnDestroy, AfterViewInit } from '@angular/core';
import 'tinymce';
import tinymce from 'tinymce/tinymce';

import 'tinymce/themes/modern';

import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/hr';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/pagebreak';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/directionality';
import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/textcolor';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textpattern';
import 'tinymce/plugins/autoresize';


                     

//declare var tinymce: any;
// Tinymce directive
@Directive({
  inputs: ['htmlEditor'],
  selector: '[htmlEditor]'
})

export class EditorDirective implements AfterViewInit, OnDestroy {
  constructor(){

  }

  public editor: any;


  public ngAfterViewInit() {
    tinymce.init({
      id: 'html',
      selector: 'textarea#html', //change this to a specific class/id
      schema: 'html5',
      resize: false,
      language_url: '/assets/tinymce/ru.js',
      // content_css: '/styles/bootstrap-grid.min.css',
      skin_url: '/assets/tinymce/skins/zmnv-tiny',      
      plugins: ["advlist autolink link image lists charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons textcolor paste colorpicker textpattern autoresize"],
      autoresize_bottom_margin: 0,
      autoresize_overflow_padding: 0,
      autoresize_min_height: 150,
      contextmenu: "link | image media | insertdatetime | searchreplace",
      menubar: false,
      toolbar1: "undo redo | backcolor styleselect removeformat | bold | unlink | bullist numlist | hr | visualblocks code",
      setup: editor => {
        this.editor = editor;
        editor.addButton('mybutton', {
          type: 'menubutton',
          text: 'My button',
          icon: false,
          menu: [{
            text: 'Menu item 1',
            onclick: function() {
              editor.insertContent('&nbsp;<strong>Menu item 1 here!</strong>&nbsp;');
            }
          }, {
            text: 'Menu item 2',
            onclick: function() {
              editor.insertContent('&nbsp;<em>Menu item 2 here!</em>&nbsp;');
            }
          }]
        });        
      },
    });

  }

  public ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  public getContent() {
    return tinymce.get('html').getContent({format : 'raw'});
  }
  public setContent(data) {
    setTimeout(function() {
        tinymce.get('html').setContent(data);
    }, 1000);
     return false;
  }
}
