import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import { get } from '@ember/object';
import fetch from 'ember-network/fetch';

export default Route.extend({
  publishing: service(),

  actions: {
    publish: function() {
      let publishUrl = "/api/publish";
      let domain = get(this, 'controller.domain');
      if(domain && domain !== '') {
        publishUrl += `?domain=${encodeURIComponent(domain)}`;
      }

      fetch(publishUrl, {method: 'POST'}).then((response) => {
        return response.json();
      }).then((result) => {
        get(this, 'publishing').update(result);
      });
    },

    unpublish: function() {
      fetch('/api/unpublish', {method: 'POST'}).then(() => {
        get(this, 'publishing').update({});
      });
    }
  }
});
