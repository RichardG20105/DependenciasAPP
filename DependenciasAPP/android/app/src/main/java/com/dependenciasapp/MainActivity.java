package com.dependenciasapp;

import android.os.Bundle;
import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen; // here
import com.marcshilling.idletimer.IdleTimerPackage; // This

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "DependenciasAPP";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this);  // here
      super.onCreate(savedInstanceState);
  }
}
