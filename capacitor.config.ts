import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins:{
    CapacitorCookies:{
      enabled: true,
    }
  },
  appId: 'io.ionic.starter',
  appName: 'app_dauphin',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
