<template>
  <v-card flat>
    <v-subheader>{{ $t('modals.settings.webUI.interface.subheader') }}</v-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="9">
          <v-text-field v-model="settings.web_ui_address" class="mr-1" outlined dense hide-details="true" :label="$t('modals.settings.webUI.interface.ipAddress')" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="settings.web_ui_port" class="ml-1" outlined dense type="number" hide-details="true" :label="$t('modals.settings.webUI.interface.port')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.web_ui_upnp" hide-details class="ma-0 pa-0" :label="$t('modals.settings.connection.listeningPort.useUPnP')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.alternative_webui_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.interface.useAlternativeWebUI')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        :disabled="!settings.alternative_webui_enabled"
        v-model="settings.alternative_webui_path"
        class="mb-2"
        outlined
        dense
        hide-details
        :label="$t('modals.settings.webUI.interface.filesLocation')"
      />
    </v-list-item>

    <v-divider class="mt-4" />
    <v-subheader>{{ $t('modals.settings.webUI.authentication.subheader') }}</v-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="settings.web_ui_username" outlined dense hide-details="true" :label="$t('modals.settings.webUI.authentication.username')" />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="webUiPassword"
            :type="showWebuiPassword ? 'text' : 'password'"
            :append-icon="showWebuiPassword ? mdiEye : mdiEyeOff"
            @click:append="showWebuiPassword = !showWebuiPassword"
            autocomplete="current password"
            autocapitalize="none"
            outlined
            dense
            hide-details="true"
            :label="$t('modals.settings.webUI.authentication.password')"
            persistent-placeholder
            :placeholder="$t('modals.settings.webUI.authentication.passwordPlaceholder')"
          />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.bypass_local_auth" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.authentication.bypassLocalhost')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.bypass_auth_subnet_whitelist_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.authentication.bypassWhitelist')" />
    </v-list-item>

    <v-list-item>
      <v-textarea
        v-model="settings.bypass_auth_subnet_whitelist"
        class="mb-5"
        outlined
        dense
        :placeholder="$t('modals.settings.webUI.authentication.whitelistExamples')"
        hide-details="true"
        :disabled="!settings.bypass_auth_subnet_whitelist_enabled"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.web_ui_max_auth_fail_count"
        class="mb-5"
        outlined
        dense
        type="number"
        hide-details="true"
        :label="$t('modals.settings.webUI.authentication.maxAttempts')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.web_ui_ban_duration"
        outlined
        dense
        type="number"
        persistent-hint
        :hint="$t('modals.settings.webUI.authentication.banDurationHint')"
        :label="$t('modals.settings.webUI.authentication.banDuration')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="settings.web_ui_session_timeout"
        outlined
        dense
        type="number"
        persistent-hint
        :hint="$t('modals.settings.webUI.authentication.sessionTimeoutHint')"
        :label="$t('modals.settings.webUI.authentication.sessionTimeout')"
      />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.use_https" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.https.subheader')" />
    </v-list-item>

    <v-list-item>
      <v-text-field
        :disabled="!settings.use_https"
        v-model="settings.web_ui_https_cert_path"
        class="mb-4"
        outlined
        dense
        hide-details
        :label="$t('modals.settings.webUI.https.certificate')"
      />
    </v-list-item>

    <v-list-item>
      <v-text-field :disabled="!settings.use_https" v-model="settings.web_ui_https_key_path" outlined dense hide-details :label="$t('modals.settings.webUI.https.key')" />
    </v-list-item>

    <v-list-item>
      <a href="https://httpd.apache.org/docs/current/ssl/ssl_faq.html#aboutcerts" target="_blank">{{ $t('modals.settings.webUI.https.tip') }}</a>
    </v-list-item>

    <v-divider />
    <v-subheader>{{ $t('modals.settings.webUI.security.subheader') }}</v-subheader>

    <v-list-item>
      <v-checkbox v-model="settings.web_ui_clickjacking_protection_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.security.clickjacking')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.web_ui_csrf_protection_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.security.csrf')" />
    </v-list-item>

    <v-list-item>
      <v-checkbox
        :disabled="!settings.use_https"
        v-model="settings.web_ui_secure_cookie_enabled"
        hide-details
        class="ma-0 pa-0"
        :label="$t('modals.settings.webUI.security.secureCookie')"
      />
    </v-list-item>

    <v-list-item>
      <v-checkbox v-model="settings.web_ui_host_header_validation_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.security.hostHeaderValidation')" />
    </v-list-item>
    <v-list-item>
      <v-textarea
        :disabled="!settings.web_ui_host_header_validation_enabled"
        v-model="settings.web_ui_domain_list"
        outlined
        required
        auto-grow
        clearable
        persistent-hint
        :hint="$t('modals.settings.webUI.security.hostHeaderValidationHint')"
      />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.web_ui_use_custom_http_headers_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.customHeaders')" />
    </v-list-item>
    <v-list-item>
      <v-textarea
        :disabled="!settings.web_ui_use_custom_http_headers_enabled"
        v-model="settings.web_ui_custom_http_headers"
        outlined
        required
        auto-grow
        clearable
        :placeholder="$t('modals.settings.webUI.customHeadersPlaceholder')"
        persistent-hint
        :hint="$t('modals.settings.webUI.customHeadersHint')"
      />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.web_ui_reverse_proxy_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.reverseProxySupport')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        :disabled="!settings.web_ui_reverse_proxy_enabled"
        v-model="settings.web_ui_reverse_proxies_list"
        outlined
        required
        auto-grow
        clearable
        persistent-hint
        :hint="$t('modals.settings.webUI.proxiesListHint')"
        :label="$t('modals.settings.webUI.proxiesList')"
      />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="settings.dyndns_enabled" hide-details class="ma-0 pa-0" :label="$t('modals.settings.webUI.dynDns.subheader')" />
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-select :disabled="!settings.dyndns_enabled" class="mb-5" v-model="dynDnsProvider" height="1" flat dense hide-details outlined :items="dynDnsProviderOptions" />
        </v-col>
        <v-col cols="4">
          <v-btn :disabled="!settings.dyndns_enabled" @click="registerDynDNS">{{ $t('modals.settings.webUI.dynDns.registerBtn') }}</v-btn>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item class="mb-4">
      <v-text-field :disabled="!settings.dyndns_enabled" v-model="settings.dyndns_domain" dense hide-details outlined :label="$t('modals.settings.webUI.dynDns.domainName')" />
    </v-list-item>

    <v-list-item class="mb-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field :disabled="!settings.dyndns_enabled" v-model="settings.dyndns_username" dense hide-details :label="$t('modals.settings.webUI.dynDns.username')" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="!settings.dyndns_enabled"
            v-model="settings.dyndns_password"
            dense
            hide-details
            :label="$t('modals.settings.webUI.dynDns.password')"
            :type="showDynDnsPassword ? 'text' : 'password'"
            :append-icon="!settings.dyndns_enabled ? '' : showDynDnsPassword ? mdiEye : mdiEyeOff"
            @click:append="showDynDnsPassword = !showDynDnsPassword"
          />
        </v-col>
      </v-row>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import { FullScreenModal, SettingsTab } from '@/mixins'
import { defineComponent } from 'vue'
import { mdiEye, mdiEyeOff } from '@mdi/js'

export default defineComponent({
  name: 'WebUI',
  mixins: [SettingsTab, FullScreenModal],
  data() {
    return {
      dynDnsProvider: 'https://www.dyndns.com/account/services/hosts/add.html',
      dynDnsProviderOptions: [
        {
          text: this.$t('modals.settings.webUI.dynDns.providers.dynDns'),
          value: 'https://www.dyndns.com/account/services/hosts/add.html'
        },
        {
          text: this.$t('modals.settings.webUI.dynDns.providers.noIp'),
          value: 'http://www.no-ip.com/services/managed_dns/free_dynamic_dns.html'
        }
      ],
      webUiPassword: '',
      showWebuiPassword: false,
      showDynDnsPassword: false,
      mdiEye,
      mdiEyeOff
    }
  },
  watch: {
    webUiPassword(newValue: string) {
      this.settings.web_ui_password = newValue === '' ? undefined : newValue
    }
  },
  methods: {
    registerDynDNS() {
      window.open(this.dynDnsProvider)
    }
  }
})
</script>
