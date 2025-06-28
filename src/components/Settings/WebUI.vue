<script setup lang="ts">
import { computed, ref } from 'vue'
import PasswordField from '@/components/Core/PasswordField.vue'
import { useI18nUtils } from '@/composables'
import { openLink } from '@/helpers'
import { usePreferenceStore } from '@/stores'

const { t } = useI18nUtils()
const preferenceStore = usePreferenceStore()

const dynDnsProvider = ref('https://www.dyndns.com/account/services/hosts/add.html')
const dynDnsProviderOptions = [
  {
    title: t('settings.webUI.dynDns.providers.dynDns'),
    value: 'https://www.dyndns.com/account/services/hosts/add.html'
  },
  {
    title: t('settings.webUI.dynDns.providers.noIp'),
    value: 'https://www.no-ip.com/services/managed_dns/free_dynamic_dns.html'
  }
]

const webUiPassword = computed({
  get: () => preferenceStore.preferences!.web_ui_password || '',
  set: val => {
    preferenceStore.preferences!.web_ui_password = val === '' ? undefined : val
  }
})

function registerDynDNS() {
  openLink(dynDnsProvider.value)
}
</script>

<template>
  <v-list>
    <v-list-subheader>{{ t('settings.webUI.interface.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="9">
          <v-text-field v-model="preferenceStore.preferences!.web_ui_address" hide-details :label="t('settings.webUI.interface.ipAddress')" />
        </v-col>
        <v-col cols="3">
          <v-text-field v-model="preferenceStore.preferences!.web_ui_port" hide-details :label="t('settings.webUI.interface.port')" />
        </v-col>

        <v-col cols="12" class="pt-0">
          <v-checkbox v-model="preferenceStore.preferences!.web_ui_upnp" hide-details :label="t('settings.webUI.interface.useUPnP')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center">
            <span><v-checkbox-btn v-model="preferenceStore.preferences!.alternative_webui_enabled" /></span>
            <v-text-field
              v-model="preferenceStore.preferences!.alternative_webui_path"
              :disabled="!preferenceStore.preferences!.alternative_webui_enabled"
              hide-details
              :label="t('settings.webUI.interface.useAlternativeWebUI')" />
          </div>
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mt-3" />
    <v-list-subheader>{{ t('settings.webUI.authentication.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="preferenceStore.preferences!.web_ui_username" hide-details :label="t('settings.webUI.authentication.username')" />
        </v-col>
        <v-col cols="12" sm="6">
          <PasswordField
            v-model="webUiPassword"
            autocapitalize="off"
            hide-details
            persistent-placeholder
            :placeholder="t('settings.webUI.authentication.passwordPlaceholder')"
            :label="t('settings.webUI.authentication.password')" />
        </v-col>

        <v-col cols="12" class="py-0">
          <v-checkbox v-model="preferenceStore.preferences!.bypass_local_auth" hide-details :label="t('settings.webUI.authentication.bypassLocalhost')" />
        </v-col>
        <v-col cols="12" class="pt-0">
          <v-checkbox v-model="preferenceStore.preferences!.bypass_auth_subnet_whitelist_enabled" hide-details :label="t('settings.webUI.authentication.bypassWhitelist')" />
          <v-textarea
            v-model="preferenceStore.preferences!.bypass_auth_subnet_whitelist"
            :disabled="!preferenceStore.preferences!.bypass_auth_subnet_whitelist_enabled"
            hide-details
            :placeholder="$t('settings.webUI.authentication.whitelistExamples')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.web_ui_max_auth_fail_count"
            type="number"
            hide-details
            :label="t('settings.webUI.authentication.maxAttempts')" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.web_ui_ban_duration"
            type="number"
            persistent-hint
            :hint="t('settings.webUI.authentication.banDurationHint')"
            :label="t('settings.webUI.authentication.banDuration')" />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="preferenceStore.preferences!.web_ui_session_timeout"
            type="number"
            persistent-hint
            :hint="t('settings.webUI.authentication.sessionTimeoutHint')"
            :label="t('settings.webUI.authentication.sessionTimeout')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider class="mt-3" />

    <v-list-item>
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-checkbox v-model="preferenceStore.preferences!.use_https" hide-details :label="t('settings.webUI.https.subheader')" />
        </v-col>
        <v-col cols="12" class="pt-0">
          <v-text-field
            v-model="preferenceStore.preferences!.web_ui_https_cert_path"
            :disabled="!preferenceStore.preferences!.use_https"
            hide-details
            :label="t('settings.webUI.https.certificate')" />
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="preferenceStore.preferences!.web_ui_https_key_path"
            :disabled="!preferenceStore.preferences!.use_https"
            hide-details
            :label="t('settings.webUI.https.key')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <a href="https://httpd.apache.org/docs/current/ssl/ssl_faq.html#aboutcerts" target="_blank">{{ t('settings.webUI.https.tip') }}</a>
    </v-list-item>

    <v-divider />
    <v-list-subheader>{{ t('settings.webUI.security.subheader') }}</v-list-subheader>

    <v-list-item>
      <v-row>
        <v-col cols="12" class="py-0">
          <v-checkbox
            v-model="preferenceStore.preferences!.web_ui_clickjacking_protection_enabled"
            hide-details
            density="compact"
            :label="t('settings.webUI.security.clickjacking')" />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-checkbox v-model="preferenceStore.preferences!.web_ui_csrf_protection_enabled" hide-details density="compact" :label="t('settings.webUI.security.csrf')" />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-checkbox
            v-model="preferenceStore.preferences!.web_ui_secure_cookie_enabled"
            :disabled="!preferenceStore.preferences!.use_https"
            hide-details
            density="compact"
            :label="t('settings.webUI.security.secureCookie')" />
        </v-col>
        <v-col cols="12" class="py-0">
          <v-checkbox
            v-model="preferenceStore.preferences!.web_ui_host_header_validation_enabled"
            hide-details
            density="compact"
            :label="t('settings.webUI.security.hostHeaderValidation')" />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="preferenceStore.preferences!.web_ui_domain_list"
            :disabled="!preferenceStore.preferences!.web_ui_host_header_validation_enabled"
            auto-grow
            clearable
            persistent-hint
            :hint="t('settings.webUI.security.hostHeaderValidationHint')" />
        </v-col>
      </v-row>
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.web_ui_use_custom_http_headers_enabled" hide-details :label="t('settings.webUI.customHeaders')" />
    </v-list-item>
    <v-list-item>
      <v-textarea
        v-model="preferenceStore.preferences!.web_ui_custom_http_headers"
        :disabled="!preferenceStore.preferences!.web_ui_use_custom_http_headers_enabled"
        auto-grow
        clearable
        persistent-hint
        :hint="t('settings.webUI.customHeadersHint')"
        :placeholder="t('settings.webUI.customHeadersPlaceholder')" />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.web_ui_reverse_proxy_enabled" hide-details :label="t('settings.webUI.reverseProxySupport')" />
    </v-list-item>
    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.web_ui_reverse_proxies_list"
        :disabled="!preferenceStore.preferences!.web_ui_reverse_proxy_enabled"
        clearable
        persistent-hint
        :hint="t('settings.webUI.proxiesListHint')"
        :label="t('settings.webUI.proxiesList')" />
    </v-list-item>

    <v-divider />

    <v-list-item>
      <v-checkbox v-model="preferenceStore.preferences!.dyndns_enabled" hide-details :label="t('settings.webUI.dynDns.subheader')" />
    </v-list-item>
    <v-list-item>
      <v-row>
        <v-col cols="8">
          <v-select v-model="dynDnsProvider" :disabled="!preferenceStore.preferences!.dyndns_enabled" density="compact" hide-details :items="dynDnsProviderOptions" />
        </v-col>
        <v-col cols="4">
          <v-btn :disabled="!preferenceStore.preferences!.dyndns_enabled" @click="registerDynDNS">
            {{ $t('settings.webUI.dynDns.registerBtn') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-list-item>

    <v-list-item>
      <v-text-field
        v-model="preferenceStore.preferences!.dyndns_domain"
        :disabled="!preferenceStore.preferences!.dyndns_enabled"
        hide-details
        :label="t('settings.webUI.dynDns.domainName')" />
    </v-list-item>

    <v-list-item>
      <v-row>
        <v-col cols="12" sm="6" class="pb-0">
          <v-text-field
            v-model="preferenceStore.preferences!.dyndns_username"
            :disabled="!preferenceStore.preferences!.dyndns_enabled"
            density="compact"
            hide-details
            :label="t('settings.webUI.dynDns.username')" />
        </v-col>
        <v-col cols="12" sm="6">
          <PasswordField
            v-model="preferenceStore.preferences!.dyndns_password"
            :disabled="!preferenceStore.preferences!.dyndns_enabled"
            density="compact"
            hide-details
            :label="t('settings.webUI.dynDns.password')"
            :hide-icon="!preferenceStore.preferences!.dyndns_enabled" />
        </v-col>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss"></style>
