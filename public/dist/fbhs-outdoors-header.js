(function() {

  "use strict";

  const settings = {
    elementName: 'fbhs-nav',
    mode: 'closed',
    utmCampaign: 'fbhs-header',
    domains: {
      'thermatru.com': {
        activeBackgroundColor: '#4b4c4e',
        activeLogoColor: '#fff',
        containerWidth: '1190px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: '#fbhs_os_header'
      },
      'dyd': {
        activeBackgroundColor: '#4b4c4e',
        activeLogoColor: '#fff',
        containerWidth: 'calc(95% + 15px);',
        containerBackground: '#eee',
        containerPadding: '0',
        target: '#fbhs_os_header'
      },
      'tt-stage.thermatrudev.com': {
        activeBackgroundColor: '#4b4c4e',
        activeLogoColor: '#fff',
        containerWidth: '1190px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: '#fbhs_os_header'
      },
      'qa.thermatru.com': {
        activeBackgroundColor: '#4b4c4e',
        activeLogoColor: '#fff',
        containerWidth: '1190px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: '#fbhs_os_header'
      },
      'store.thermatru.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1410px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: 'body'
      },
      'fiberondecking.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1220px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: '.wrap'
      },
      'fiberongenesis.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1220px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: '.wrap'
      },
      'cladding.fiberondecking.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1220px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: 'body'
      },
      'fiberoncladding.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1220px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: 'body'
      },
      'store.fiberondecking.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: 'initial',
        containerBackground: '#eee',
        containerPadding: '38px',
        target: '[data-section-id="header"]'
      },
      'fiberonstg.myshopify.com': {
        activeBackgroundColor: '#f5f5f5',
        activeLogoColor: '#808285',
        containerWidth: '1340px',
        containerBackground: '#fff',
        containerPadding: '0',
        target: 'body'
      },
      'fypon.com': {
        activeBackgroundColor: '#0079c1',
        activeLogoColor: '#fff',
        containerWidth: '1140px',
        containerBackground: '#fff',
        containerPadding: '0',
        target: 'body'
      },
      'larsondoors.com': {
        activeBackgroundColor: '#aa202d',
        activeLogoColor: '#fff',
        containerWidth: '1230px',
        containerBackground: '#fff',
        containerPadding: '0',
        target: '.sfContentBlock'
      },
      'larson-parts-dev.myshopify.com': {
        activeBackgroundColor: '#aa202d',
        activeLogoColor: '#fff',
        containerWidth: '1145px',
        containerBackground: '#fff',
        containerPadding: '0',
        target: 'body'
      },
      'parts.larsondoors.com': {
        activeBackgroundColor: '#aa202d',
        activeLogoColor: '#fff',
        containerWidth: '1145px',
        containerBackground: '#fff',
        containerPadding: '0',
        target: 'body'
      },
      'blog.larsondoors.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1300px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: '.FBHS-navbar-wrapper'
      },
      'landing.larsondoors.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1300px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: '.FBHS-navbar-wrapper'
      },
      'solarinnovations.com': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1410px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: 'body'
      },
      'default': {
        activeBackgroundColor: '#fff',
        activeLogoColor: '#808285',
        containerWidth: '1200px',
        containerBackground: '#eee',
        containerPadding: '0',
        target: 'body'
      },
    },
    domainGroups: {
      'thermatru': [
        'thermatru.com',
	'tt-stage.thermatrudev.com',
        'store.thermatru.com'
      ],
      'fiberon': [
        'fiberondecking.com',
	'fiberongenesis.com',
        'fiberoncladding.com',
        'store.fiberondecking.com',
        'cladding.fiberondecking.com',
        'fiberonstg.myshopify.com',
      ],
      'fypon': [
        'fypon.com',
      ],
      'larson': [
        'larsondoors.com',
	'blog.larsondoors.com',
	'landing.larsondoors.com',
        'parts.larsondoors.com',
        'larson-parts-dev.myshopify.com'
      ],
      'solarinnovations': [
        'solarinnovations.com'
      ]
    },
    exceptions: {
      'dyd': document.querySelector('.dyd-partial')
    }
  };

  let navWrapper        = document.createElement(settings.elementName),
      shadowRoot        = navWrapper.attachShadow({mode: settings.mode}),
      domain            = location.hostname ? location.hostname.replace('www.','') : 'default',
      domainSettings    = RetriveDomainSettings(),
      targetElement     = document.querySelector(domainSettings.target),
      activeDomainGroup = RetrieveDomainGroup(settings.domainGroups),
      currentFBHSBar    = document.querySelector('.fbhs-header');

  function RetriveDomainSettings() {
    for (const [key, value] of Object.entries(settings.exceptions)) {
      if (value) {
        return settings.domains[key];
      }
    }
    return settings.domains[domain];
  }

  function RetrieveDomainGroup(domainGroups) {
    for (const [key] of Object.entries(domainGroups)) {
      if (domainGroups[key].includes(domain)) {
        return key;
      }
    }
  }

  if (currentFBHSBar) {
    currentFBHSBar.style.setProperty("display", "none", "important");
    currentFBHSBar.remove();
  }

  let styles = `
    :host {
      all: initial !important;
      display: block !important;
    }

    .fbhs-header {
      position: relative;
      z-index: 8000;
      display: block;
      background: ${domainSettings.containerBackground};
      font-family: helvetica, arial, sans-serif;
      font-size: 16px;
    }
    
    .fbhs-header .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0 auto;
      max-width: ${domainSettings.containerWidth};
      box-sizing: border-box;
    }

    @media (min-width: 1000px) {
      .fbhs-header .container {
        padding: 0 ${domainSettings.containerPadding};
      }
    }

    .fbhs-header .fbhs-modal-open {
      cursor: pointer;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 1em;
      line-height: 1;
      font-size: 1.2em;
      color: #808285;
      transition: color .25s ease-in-out;
    }

    .fbhs-header .fbhs-modal-open:hover {
      color: #545454;
    }

    .fbhs-header .fbhs-modal-open .fbhs-label {
      font-size: .7em;
      text-transform: uppercase;
      margin-right: .5em;
      text-align: right;
    }

    .fbhs-header .fbhs-modal-close {
      cursor: pointer;
      font-weight: bold;
    }

    .fbhs-header .fbhs-mobile-logo {
      display: flex;
      justify-content: space-between;;
      align-items: stretch;
      width: 100%;
    }

    @media (min-width: 1000px) {
      .fbhs-header .fbhs-mobile-logo {
        display: none;
      }
    }

    .fbhs-header .fbhs-overlay {
      box-sizing: border-box;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      height: 100vh;
      max-height: 100vh;
      padding: 2em;
      background: rgba(0, 0, 0, .5);
      z-index: 9000;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      overflow: auto;
      opacity: 0;
      pointer-events: none;
      transition: opacity .25s ease-in-out;
    }

    @media (min-width: 1000px) {
      .fbhs-header .fbhs-overlay {
        position: static;
        overfow: initial;
        opacity: 1;
        pointer-events: auto;
        background: none;
        padding: 0;
        height: auto;
        max-height: auto;
      }
    }

    .fbhs-header .fbhs-overlay.active {
      opacity: 1;
      pointer-events: auto;
    }

    .fbhs-header .fbhs-modal {
      position: relative;
      background: #fff;
      width: 100%;
      max-width: 15em;
      border-radius: .2em;
      padding: 1em 0;
      overflow: hidden;
    }

    @media (min-width: 1000px) {
      .fbhs-header .fbhs-modal {
        background: transparent;
        max-width: initial;
        border-radius: 0;
        overflow: auto;
        padding: 0;
        display: flex;
        flex-wrap: wrap;
      }
    }

    .fbhs-header .fbhs-modal .fbhs-modal-close {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 1.5em;
      color: #808285;
      transition: color .25s ease-in-out;
      padding: .3em .5em;
      z-index: 9000;
      line-height: 1;
    }

    @media (min-width: 1000px) {
      .fbhs-header .fbhs-modal .fbhs-modal-close {
        display: none;
      }
    }

    .fbhs-header .fbhs-modal .fbhs-modal-close:hover {
      color: #545454;
    }
    
    .fbhs-header .fbhs-companies {
      display: flex;
      align-items: stretch;
      justify-content: flex-start;
      flex-wrap: wrap;
      width: 100%;
    }
    
    .fbhs-header .fbhs-company {
      display: block;
      padding: .5em 1.25em;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: none;
    }

    .fbhs-header .fbhs-overlay .fbhs-company {
      padding: 1em 1.25em;
    }

    @media (min-width: 1000px) {
      .fbhs-header .fbhs-overlay .fbhs-company {
        padding: .5em 1.25em;
      }
    }
    
    .fbhs-header .fbhs-companies .fbhs-company-logo {
      fill: #808285;
      transition: fill .25s ease-in-out;
    }
    
    .fbhs-header .fbhs-companies a:hover .fbhs-company-logo {
      fill: #545454;
    }

    .fbhs-header .fbhs-companies a.active {
      background-color: #eaeaea;
    }

    @media (min-width: 1000px) {
      .fbhs-header .fbhs-companies a.active {
        background-color: ${domainSettings.activeBackgroundColor};
      }
      
      .fbhs-header .fbhs-companies a.active .fbhs-company-logo {
        fill: ${domainSettings.activeLogoColor};
      }
    }
    
    @media (min-width: 1000px) {
      .fbhs-header > .container {
          flex-direction: row;
          justify-content: flex-start;
          align-items: stretch;
      }
    }
  `;
  
  let template = `
  <nav class="fbhs-header">
    <div class="container">
      <div class="fbhs-companies">
        <div class="fbhs-mobile-logo">
          <a class="fbhs-company" href="https://www.fbhs.com/brands/outdoors-security/?utm_source=${domain}&utm_medium=referral&utm_campaign=${settings.utmCampaign}" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="22.57" viewBox="0 0 120 22.57" class="fbhs-company-logo">
              <title>Fortune Brands Home & Security</title>
              <g transform="translate(-508.867 -459.935)">
                <path d="M526.806,463.307h6.558v.952h-5.528v3.26h4.558v.938h-4.558v3.978h-1.03Z" transform="translate(11.959 2.248)"/>
                <path d="M536.459,468.2v-.027a2.55,2.55,0,0,0-2.5-2.633,2.489,2.489,0,0,0-2.465,2.607v.027a2.531,2.531,0,0,0,2.49,2.622,2.488,2.488,0,0,0,2.478-2.595m-6,0v-.027a3.514,3.514,0,0,1,7.028-.027v.027a3.5,3.5,0,0,1-3.533,3.52,3.453,3.453,0,0,1-3.495-3.493" transform="translate(14.396 3.145)"/>
                <path d="M535.3,464.787h1v1.76a2.889,2.889,0,0,1,2.752-1.878v1.083h-.078c-1.473,0-2.673,1.057-2.673,3.09v2.687h-1Z" transform="translate(17.62 3.154)"/>
                <path d="M538.246,463.518h1v2.035h2.138v.887h-2.138v3.937a1,1,0,0,0,1.133,1.122,2.1,2.1,0,0,0,.978-.235v.862a2.535,2.535,0,0,1-1.213.287,1.716,1.716,0,0,1-1.9-1.9" transform="translate(19.586 2.389)"/>
                <path d="M540.706,468.924v-4.185h1v3.938a1.8,1.8,0,0,0,1.865,2.033A1.991,1.991,0,0,0,545.6,468.6v-3.858h.99v6.742h-.99v-1.175a2.568,2.568,0,0,1-2.308,1.318,2.463,2.463,0,0,1-2.582-2.7" transform="translate(21.226 3.203)"/>
                <path d="M545.237,464.8h1v1.173a2.556,2.556,0,0,1,2.308-1.317,2.462,2.462,0,0,1,2.582,2.7v4.187h-1V467.6a1.8,1.8,0,0,0-1.865-2.033,1.984,1.984,0,0,0-2.022,2.112v3.86h-1Z" transform="translate(24.247 3.145)"/>
                <path d="M554.848,467.769a2.215,2.215,0,0,0-2.153-2.268,2.326,2.326,0,0,0-2.188,2.268Zm-1.968,3.052a2.786,2.786,0,0,0,2.123-.952l.627.56a3.48,3.48,0,0,1-2.778,1.265,3.529,3.529,0,0,1-.13-7.042c2,0,3.145,1.592,3.145,3.573,0,.092,0,.2-.013.352h-5.347a2.355,2.355,0,0,0,2.373,2.243" transform="translate(27.081 3.145)"/>
                <path d="M560.584,471.488c1.382,0,2.243-.612,2.243-1.63v-.027c0-.99-.835-1.563-2.427-1.563h-2.882v3.22Zm-.365-4.133c1.238,0,2.1-.56,2.1-1.63V465.7c0-.9-.717-1.488-2.02-1.488h-2.778v3.143Zm-3.717-4.068h3.887a3.353,3.353,0,0,1,2.385.808,2.026,2.026,0,0,1,.587,1.46v.027a2.2,2.2,0,0,1-1.447,2.113c1.082.325,1.955.95,1.955,2.2v.027c0,1.565-1.317,2.492-3.312,2.492H556.5Z" transform="translate(31.757 2.234)"/>
                <path d="M561.782,464.766h1v1.76a2.889,2.889,0,0,1,2.752-1.878v1.083h-.078c-1.473,0-2.673,1.057-2.673,3.09v2.687h-1Z" transform="translate(35.277 3.14)"/>
                <path d="M569.19,469.023V468.4a6.927,6.927,0,0,0-1.968-.287c-1.252,0-1.97.548-1.97,1.357v.025c0,.848.783,1.343,1.7,1.343a2.014,2.014,0,0,0,2.242-1.812m-4.955.522v-.027c0-1.447,1.173-2.2,2.882-2.2a7.051,7.051,0,0,1,2.06.287v-.208c0-1.2-.73-1.825-2-1.825a4.694,4.694,0,0,0-2.047.482l-.3-.822a5.534,5.534,0,0,1,2.452-.573,3,3,0,0,1,2.178.743,2.671,2.671,0,0,1,.7,1.982V471.5h-.992V470.5a2.954,2.954,0,0,1-2.425,1.148,2.265,2.265,0,0,1-2.517-2.1" transform="translate(36.912 3.147)"/>
                <path d="M568.749,464.775h1v1.173a2.551,2.551,0,0,1,2.307-1.317,2.462,2.462,0,0,1,2.582,2.7v4.187h-1v-3.938a1.8,1.8,0,0,0-1.865-2.033,1.982,1.982,0,0,0-2.02,2.112v3.86h-1Z" transform="translate(39.921 3.131)"/>
                <path d="M578.85,469.205v-.025a2.506,2.506,0,0,0-2.438-2.6,2.38,2.38,0,0,0-2.373,2.6v.025a2.427,2.427,0,0,0,2.373,2.608,2.518,2.518,0,0,0,2.438-2.608m-5.842.013v-.025a3.309,3.309,0,0,1,3.222-3.508,3.04,3.04,0,0,1,2.582,1.435v-4.068h1v9.518h-1v-1.357a3.032,3.032,0,0,1-2.582,1.5,3.289,3.289,0,0,1-3.222-3.495" transform="translate(42.761 2.078)"/>
                <path d="M577.753,470.645l.508-.717a3.953,3.953,0,0,0,2.335.86c.808,0,1.4-.417,1.4-1.068v-.027c0-.678-.8-.94-1.682-1.187-1.057-.3-2.23-.665-2.23-1.9v-.027a2.041,2.041,0,0,1,2.3-1.93,4.607,4.607,0,0,1,2.425.743l-.457.757a3.8,3.8,0,0,0-2-.652c-.795,0-1.3.417-1.3.978v.025c0,.64.835.887,1.735,1.16,1.042.313,2.163.718,2.163,1.93v.027a2.124,2.124,0,0,1-2.4,2.022,4.637,4.637,0,0,1-2.79-.992" transform="translate(45.924 3.141)"/>
                <path d="M520.367,464.6l11.128,9.648a11.187,11.187,0,0,0,.442-3.12,11.538,11.538,0,0,0-23.07.177,10.688,10.688,0,0,0,.417,2.958Z" transform="translate(0 0)"/>
                <path d="M509.194,468.785a11.611,11.611,0,0,0,21.95,0Z" transform="translate(0.218 5.9)"/>
              </g>
            </svg>
          </a>
          <a class="fbhs-modal-open"><span class="fbhs-label">View More Brands</span> &#9776</a>
        </div>
        <div class="fbhs-overlay fbhs-modal-close">
          <div class="fbhs-modal">
            <a class="fbhs-modal-close">&times;</a>
            <a class="fbhs-company" href="https://www.fbhs.com/brands/outdoors-security/?utm_source=${domain}&utm_medium=referral&utm_campaign=${settings.utmCampaign}" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="120" height="22.57" viewBox="0 0 120 22.57" class="fbhs-company-logo">
                <title>Fortune Brands Home & Security</title>
                <g transform="translate(-508.867 -459.935)">
                  <path d="M526.806,463.307h6.558v.952h-5.528v3.26h4.558v.938h-4.558v3.978h-1.03Z" transform="translate(11.959 2.248)"/>
                  <path d="M536.459,468.2v-.027a2.55,2.55,0,0,0-2.5-2.633,2.489,2.489,0,0,0-2.465,2.607v.027a2.531,2.531,0,0,0,2.49,2.622,2.488,2.488,0,0,0,2.478-2.595m-6,0v-.027a3.514,3.514,0,0,1,7.028-.027v.027a3.5,3.5,0,0,1-3.533,3.52,3.453,3.453,0,0,1-3.495-3.493" transform="translate(14.396 3.145)"/>
                  <path d="M535.3,464.787h1v1.76a2.889,2.889,0,0,1,2.752-1.878v1.083h-.078c-1.473,0-2.673,1.057-2.673,3.09v2.687h-1Z" transform="translate(17.62 3.154)"/>
                  <path d="M538.246,463.518h1v2.035h2.138v.887h-2.138v3.937a1,1,0,0,0,1.133,1.122,2.1,2.1,0,0,0,.978-.235v.862a2.535,2.535,0,0,1-1.213.287,1.716,1.716,0,0,1-1.9-1.9" transform="translate(19.586 2.389)"/>
                  <path d="M540.706,468.924v-4.185h1v3.938a1.8,1.8,0,0,0,1.865,2.033A1.991,1.991,0,0,0,545.6,468.6v-3.858h.99v6.742h-.99v-1.175a2.568,2.568,0,0,1-2.308,1.318,2.463,2.463,0,0,1-2.582-2.7" transform="translate(21.226 3.203)"/>
                  <path d="M545.237,464.8h1v1.173a2.556,2.556,0,0,1,2.308-1.317,2.462,2.462,0,0,1,2.582,2.7v4.187h-1V467.6a1.8,1.8,0,0,0-1.865-2.033,1.984,1.984,0,0,0-2.022,2.112v3.86h-1Z" transform="translate(24.247 3.145)"/>
                  <path d="M554.848,467.769a2.215,2.215,0,0,0-2.153-2.268,2.326,2.326,0,0,0-2.188,2.268Zm-1.968,3.052a2.786,2.786,0,0,0,2.123-.952l.627.56a3.48,3.48,0,0,1-2.778,1.265,3.529,3.529,0,0,1-.13-7.042c2,0,3.145,1.592,3.145,3.573,0,.092,0,.2-.013.352h-5.347a2.355,2.355,0,0,0,2.373,2.243" transform="translate(27.081 3.145)"/>
                  <path d="M560.584,471.488c1.382,0,2.243-.612,2.243-1.63v-.027c0-.99-.835-1.563-2.427-1.563h-2.882v3.22Zm-.365-4.133c1.238,0,2.1-.56,2.1-1.63V465.7c0-.9-.717-1.488-2.02-1.488h-2.778v3.143Zm-3.717-4.068h3.887a3.353,3.353,0,0,1,2.385.808,2.026,2.026,0,0,1,.587,1.46v.027a2.2,2.2,0,0,1-1.447,2.113c1.082.325,1.955.95,1.955,2.2v.027c0,1.565-1.317,2.492-3.312,2.492H556.5Z" transform="translate(31.757 2.234)"/>
                  <path d="M561.782,464.766h1v1.76a2.889,2.889,0,0,1,2.752-1.878v1.083h-.078c-1.473,0-2.673,1.057-2.673,3.09v2.687h-1Z" transform="translate(35.277 3.14)"/>
                  <path d="M569.19,469.023V468.4a6.927,6.927,0,0,0-1.968-.287c-1.252,0-1.97.548-1.97,1.357v.025c0,.848.783,1.343,1.7,1.343a2.014,2.014,0,0,0,2.242-1.812m-4.955.522v-.027c0-1.447,1.173-2.2,2.882-2.2a7.051,7.051,0,0,1,2.06.287v-.208c0-1.2-.73-1.825-2-1.825a4.694,4.694,0,0,0-2.047.482l-.3-.822a5.534,5.534,0,0,1,2.452-.573,3,3,0,0,1,2.178.743,2.671,2.671,0,0,1,.7,1.982V471.5h-.992V470.5a2.954,2.954,0,0,1-2.425,1.148,2.265,2.265,0,0,1-2.517-2.1" transform="translate(36.912 3.147)"/>
                  <path d="M568.749,464.775h1v1.173a2.551,2.551,0,0,1,2.307-1.317,2.462,2.462,0,0,1,2.582,2.7v4.187h-1v-3.938a1.8,1.8,0,0,0-1.865-2.033,1.982,1.982,0,0,0-2.02,2.112v3.86h-1Z" transform="translate(39.921 3.131)"/>
                  <path d="M578.85,469.205v-.025a2.506,2.506,0,0,0-2.438-2.6,2.38,2.38,0,0,0-2.373,2.6v.025a2.427,2.427,0,0,0,2.373,2.608,2.518,2.518,0,0,0,2.438-2.608m-5.842.013v-.025a3.309,3.309,0,0,1,3.222-3.508,3.04,3.04,0,0,1,2.582,1.435v-4.068h1v9.518h-1v-1.357a3.032,3.032,0,0,1-2.582,1.5,3.289,3.289,0,0,1-3.222-3.495" transform="translate(42.761 2.078)"/>
                  <path d="M577.753,470.645l.508-.717a3.953,3.953,0,0,0,2.335.86c.808,0,1.4-.417,1.4-1.068v-.027c0-.678-.8-.94-1.682-1.187-1.057-.3-2.23-.665-2.23-1.9v-.027a2.041,2.041,0,0,1,2.3-1.93,4.607,4.607,0,0,1,2.425.743l-.457.757a3.8,3.8,0,0,0-2-.652c-.795,0-1.3.417-1.3.978v.025c0,.64.835.887,1.735,1.16,1.042.313,2.163.718,2.163,1.93v.027a2.124,2.124,0,0,1-2.4,2.022,4.637,4.637,0,0,1-2.79-.992" transform="translate(45.924 3.141)"/>
                  <path d="M520.367,464.6l11.128,9.648a11.187,11.187,0,0,0,.442-3.12,11.538,11.538,0,0,0-23.07.177,10.688,10.688,0,0,0,.417,2.958Z" transform="translate(0 0)"/>
                  <path d="M509.194,468.785a11.611,11.611,0,0,0,21.95,0Z" transform="translate(0.218 5.9)"/>
                </g>
              </svg>
            </a>
            <a class="fbhs-company ${activeDomainGroup ==='thermatru' ? 'active' : ''}" href="https://www.thermatru.com/?utm_source=${domain}&utm_medium=referral&utm_campaign=${settings.utmCampaign}" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="96.259" height="22.57" viewBox="0 0 96.259 22.57" class="fbhs-company-logo">
              <title>Therma-Tru Doors</title>
                <g transform="translate(-162.19 -351.722)">
                  <path d="M175.487,351.722v5.567h-4.313v-5.567H162.19v2.367h2.23v11.319h2.23V354.09h2.295v11.319h2.23v-5.752h4.313v5.752h2.23V351.722Z" transform="translate(0 0)"/>
                  <path d="M205.959,351.722h6.478v2.368h-4.248v3.347h4.069V359.8h-4.069v3.237h4.248v2.367h-6.478Z" transform="translate(-26.761)"/>
                  <path d="M226.188,351.722h3.695a3.985,3.985,0,0,1,2.93.925,4.45,4.45,0,0,1,1.416,3.311,5.141,5.141,0,0,1-1.155,3.273,3.728,3.728,0,0,1-2,1.129l3.271,5.049h-2.7l-3.19-5.234h-.033v5.234h-2.23Zm2.23,6.548h1.432a2.091,2.091,0,1,0,0-4.18h-1.432Z" transform="translate(-39.129)"/>
                  <path d="M248.763,351.722h3.093l3.206,10.357h.033l3.174-10.357h3.092v13.686h-2.23V355.143h-.049l-3.076,10.265h-1.888l-3.093-10.265h-.033v10.265h-2.23Z" transform="translate(-52.932)"/>
                  <path d="M287.446,351.722h1.741l5.046,13.686h-2.457l-1.286-3.532h-4.313l-1.285,3.532h-2.458Zm-.521,7.768h2.767l-1.367-4.2h-.033Z" transform="translate(-73.518)"/>
                  <path d="M350.034,360.359a3.724,3.724,0,0,0,2-1.129,5.142,5.142,0,0,0,1.156-3.273,4.451,4.451,0,0,0-1.416-3.311,3.985,3.985,0,0,0-2.93-.925H338.433v2.368h2.229v11.319h2.23V354.09h2.26v11.319h2.229v-5.234h.033l3.189,5.234h2.7Zm-2.653-2.09v-4.18h1.432a2.091,2.091,0,1,1,0,4.18Z" transform="translate(-107.757)"/>
                  <path d="M379.37,351.722l-.016,8.693c0,.684,0,2.9,2.084,2.9s2.083-2.219,2.083-2.9v-8.693h2.229v8.693a6.212,6.212,0,0,1-.7,3.237,4.24,4.24,0,0,1-3.6,2.034,4.349,4.349,0,0,1-3.581-1.96,6.017,6.017,0,0,1-.749-3.31v-8.693Z" transform="translate(-131.413)"/>
                  <path d="M405.7,353.208a1.337,1.337,0,1,1-1.332-1.336A1.337,1.337,0,0,1,405.7,353.208Zm-2.358,0a1.022,1.022,0,1,0,1.022-1.036A1.026,1.026,0,0,0,403.342,353.208Zm1.1-.752c.094,0,.539,0,.539.416a.351.351,0,0,1-.283.371v.007c.209.059.248.186.255.382.014.259.014.29.049.354h-.311c-.028-.046-.038-.091-.045-.284-.012-.241-.06-.308-.273-.329h-.27v.613h-.3v-1.53Zm-.339.672h.272c.109,0,.294,0,.294-.245-.017-.16-.129-.178-.26-.178H404.1Z" transform="translate(-147.251 -0.092)"/>
                  <path d="M320.337,392.319h1.512a3.87,3.87,0,0,1,2.736.775,3.494,3.494,0,0,1,1.1,2.573,3.294,3.294,0,0,1-1.593,2.879,4.751,4.751,0,0,1-2.214.432h-1.538Zm1.233,5.507h.262a3.07,3.07,0,0,0,1.619-.324,2.094,2.094,0,0,0,1-1.835,2.2,2.2,0,0,0-.711-1.638,2.68,2.68,0,0,0-1.934-.558h-.234Z" transform="translate(-96.693 -24.822)"/>
                  <path d="M338.87,391.972a3.465,3.465,0,1,1-3.483,3.483A3.474,3.474,0,0,1,338.87,391.972Zm0,5.777a2.313,2.313,0,1,0-2.25-2.3A2.285,2.285,0,0,0,338.87,397.749Z" transform="translate(-105.895 -24.609)"/>
                  <path d="M357.857,391.972a3.465,3.465,0,1,1-3.483,3.483A3.474,3.474,0,0,1,357.857,391.972Zm0,5.777a2.313,2.313,0,1,0-2.25-2.3A2.284,2.284,0,0,0,357.857,397.749Z" transform="translate(-117.504 -24.609)"/>
                  <path d="M374.08,392.319h2.042a2.4,2.4,0,0,1,1.62.451,2.062,2.062,0,0,1,.783,1.611,2.32,2.32,0,0,1-.639,1.592,2.154,2.154,0,0,1-1.107.549l1.809,2.457h-1.494l-1.764-2.546h-.018v2.546H374.08Zm1.232,3.186h.792c1.017,0,1.188-.675,1.188-1.026,0-.369-.225-1.008-1.188-1.008h-.792Z" transform="translate(-129.552 -24.822)"/>
                  <path d="M387.138,396.858a.9.9,0,0,0,1.8.054c0-.684-.441-.809-1.269-1.125a1.943,1.943,0,0,1-1.583-1.916,1.889,1.889,0,0,1,1.953-1.9,1.955,1.955,0,0,1,1.97,1.9h-1.259a.708.708,0,0,0-.747-.746.66.66,0,0,0-.684.675c0,.577.432.7,1.107.927a2.138,2.138,0,0,1,1.746,2.051,2.064,2.064,0,0,1-2.159,2.124,2.129,2.129,0,0,1-2.169-2.043Z" transform="translate(-136.744 -24.609)"/>
                  <path d="M316.685,352.211v13.608h7V352.211Zm1.1,7.211a.35.35,0,1,1,.353-.351A.353.353,0,0,1,317.789,359.422Z" transform="translate(-94.46 -0.299)"/>
                </g>
              </svg>
            </a>
            <a class="fbhs-company ${activeDomainGroup ==='larson' ? 'active' : ''}" href="https://www.larsondoors.com/?utm_source=${domain}&utm_medium=referral&utm_campaign=${settings.utmCampaign}" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="65" height="24.992" viewBox="0 0 65 24.992" class="fbhs-company-logo">
                <title>LARSON Storm Doors and Windows</title>
                <g transform="translate(-130.181 -338.7)">
                  <path d="M296.989,369.538c-1.834,0-3.206,1.961-3.335,4.727v.175c0,1.652.782,2.619,2.091,2.619a2.98,2.98,0,0,0,2.415-1.3A6.986,6.986,0,0,0,299.2,372.1C299.2,370.492,298.3,369.538,296.989,369.538Z" transform="translate(-120.514 -22.578)"/>
                  <path d="M355.881,401.059c0-.086-.074-.1-.143-.1H355.6v.206h.105C355.8,401.166,355.881,401.162,355.881,401.059Z" transform="translate(-166.171 -45.976)"/>
                  <path d="M194.074,375.462l2.838.031-.684-3.8Z" transform="translate(-47.147 -24.28)"/>
                  <path d="M234.407,371.4c-.553-.742-1.759-.634-2.666-.63a.871.871,0,0,0-.8.406c-.281.9-.568,2-.772,2.753,1.212.008,2.805.25,3.718-.6A1.8,1.8,0,0,0,234.407,371.4Z" transform="translate(-73.741 -23.608)"/>
                  <path d="M162.769,338.7c-17.949-.127-32.54,5.364-32.588,12.264s14.463,12.6,32.412,12.724,32.539-5.364,32.588-12.265S180.718,338.828,162.769,338.7ZM133.9,355.655l.216-.788.231-.029c.808-.086,1.064-.372,1.37-1.518l1.288-4.8a5.263,5.263,0,0,0,.18-.859c.041-.444-.183-.645-.831-.745l-.1-.014.2-.788h4.266l-.216.788-.431.029c-.776.043-1.094.387-1.4,1.518l-1.246,4.654a7.97,7.97,0,0,0-.273,1.13c-.036.386.3.573,1.062.573a5.926,5.926,0,0,0,3.88-1.674,11.518,11.518,0,0,0,1-1.031l.706.4-2.065,3.151Zm33.33,2.885c-.7,1.408-1.932,1.59-3.423,1.59-2.09,0-3.967-1.641-4.872-4.254a13.014,13.014,0,0,1-.949-4.569h-1.922l-.544,1.937a5.194,5.194,0,0,0-.152.859c-.027.444.136.7.719.745l.227.029-.175.773h-2.88v.006h-4.139l.129-.788.186-.014c.743-.086,1.015-.243,1.015-.573a2.289,2.289,0,0,0-.072-.5l-.343-1.675-3.583-.033-.886,1.6a1.093,1.093,0,0,0-.229.587c0,.315.347.52,1.1.605l-.143.788h-3.5l.157-.788c.772-.158.943-.315,1.672-1.589l4.407-7.161h1.6l1.586,7.476c.18.815.27,1.028.722,1.168.444-.16.667-.557.876-1.446l1.346-4.8a5.2,5.2,0,0,0,.152-.859c.027-.444-.2-.644-.856-.745l-.1-.015.176-.787H159.6a4.319,4.319,0,0,1,2.023.344,1.784,1.784,0,0,1,.953,1.747,3.228,3.228,0,0,1-1.9,2.674,4.846,4.846,0,0,1-1.234.42,38.37,38.37,0,0,0,.821,3.911c.8,2.933,2.437,4.319,3.749,4.319a1.582,1.582,0,0,0,1.388-1,1.168,1.168,0,0,1,.659-.959,1.063,1.063,0,0,1,1,.007A.909.909,0,0,1,167.234,358.54Zm-.827-8.872a18.864,18.864,0,0,1,2.469.73,1.915,1.915,0,0,1,1.352,2.033c-.053,1.934-1.981,3.563-4.259,3.563a4.788,4.788,0,0,1-2.692-.827l-.34.544h-.6l-.345-3.556.884.086c.666,1.933,1.636,2.855,3.114,2.855a2.307,2.307,0,0,0,2.389-1.935c.02-.716-.376-1.1-1.306-1.346-.377-.086-.478-.158-.612-.186l-.673-.172c-.538-.143-.861-.229-.956-.258a3.017,3.017,0,0,1-.963-.473,1.9,1.9,0,0,1-.669-1.647,3.437,3.437,0,0,1,3.607-3.15,5.281,5.281,0,0,1,2.45.616l.24-.372h.561l.281,2.692-.712.162a3.034,3.034,0,0,0-2.782-2.222,1.788,1.788,0,0,0-1.894,1.544C164.932,349,165.343,349.425,166.408,349.669Zm8.553,6.013a3.737,3.737,0,0,1-3.968-3.9,5.8,5.8,0,0,1,5.484-6.013,3.843,3.843,0,0,1,4.036,4.169A5.651,5.651,0,0,1,174.961,355.681Zm14.273.138a.586.586,0,1,1,.588-.589A.586.586,0,0,1,189.234,355.819Zm1.5-8.914-.229.029c-.8.086-1.034.372-1.25,1.518l-1.373,7.2h-1.311l-3.472-8.421-1.142,6.015a5.088,5.088,0,0,0-.112.859c-.007.458.206.63.89.745l.114.014-.154.788h-3.324l.154-.788.243-.029c.773-.086,1.006-.372,1.222-1.518l.911-4.8a5.512,5.512,0,0,0,.127-.859c.006-.444-.248-.645-.9-.745l-.1-.014.154-.788h3.458l2.89,6.664.82-4.2a5.027,5.027,0,0,0,.112-.859c.007-.444-.293-.7-.949-.8l-.1-.014.14-.788h3.34Z" transform="translate(0 0)"/>
                  <path d="M354.678,400.03a.474.474,0,1,0,.456.471A.457.457,0,0,0,354.678,400.03Zm.168.8-.177-.279h-.107v.279h-.1v-.649h.251c.154,0,.227.061.227.186a.167.167,0,0,1-.171.177l.186.286Z" transform="translate(-165.13 -45.262)"/>
                </g>
              </svg>
            </a>
            <a class="fbhs-company ${activeDomainGroup ==='fiberon' ? 'active' : ''}" href="https://www.fiberondecking.com/?utm_source=${domain}&utm_medium=referral&utm_campaign=${settings.utmCampaign}" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="75.982" height="22.185" viewBox="0 0 75.982 22.185" class="fbhs-company-logo">
                <title>Fiberon Composite Decking, Railing, and Cladding</title>
                <g transform="translate(-109.98 -222.489)">
                  <path d="M241.351,281.809h56.259v.841H241.351v-.841Z" transform="translate(-113.921 -51.441)"/>
                  <path d="M412.125,310.124v-11.78h3.618c.023.218.016.84.049.965a6.857,6.857,0,0,1,3.651-1.06h.923v3.11c-.083.157-.159.324-.232.494-2.36-.544-4.206.385-4.218,1.9v6.373Z" transform="translate(-262.012 -65.696)"/>
                  <path d="M169.382,263.3a2.231,2.231,0,1,1,2.228,2.3,2.268,2.268,0,0,1-2.228-2.3" transform="translate(-51.512 -33.395)"/>
                  <path d="M130.658,241.509a3.038,3.038,0,1,1,2.944-3.038,2.991,2.991,0,0,1-2.944,3.038m.033-9.488c-.931,0-2.589.3-3.266,1.245l0-3.134a7.408,7.408,0,1,0-14.809,0l-.01,2.329H109.98v3.486h2.631v8.483h4.163v-8.475h1.731v8.475h3.9V232.46h-5.9l0-2.329a3.507,3.507,0,1,1,7.01,0l.011,14.3h3.735a4.674,4.674,0,0,0-.193-1.243c.778,1.327,2.824,1.488,3.877,1.488a9.854,9.854,0,0,0,1.456-.112,6.055,6.055,0,0,0,3.739-2.735,6.21,6.21,0,0,0,1.028-3.356,6.606,6.606,0,0,0-6.488-6.45" transform="translate(0 0)"/>
                  <path d="M665.387,297.48h.215c.147,0,.273-.019.273-.2,0-.16-.142-.19-.266-.19h-.222v.393Zm-.246-.586h.49c.318,0,.488.115.488.4a.339.339,0,0,1-.346.37l.355.6h-.248l-.344-.588h-.149v.588h-.246v-1.368Zm1.333.691a.889.889,0,1,0-.886.972.916.916,0,0,0,.886-.972m-2.052,0a1.169,1.169,0,1,1,1.166,1.208,1.188,1.188,0,0,1-1.166-1.208" transform="translate(-480.798 -64.075)"/>
                  <path d="M323.912,299.2a3.645,3.645,0,0,0-2.692-1.682,3.485,3.485,0,0,0-2.911,1.682Zm-9.214,1.989q.009-.172.009-.343c0-.156,0-.31-.015-.462.209-3.74,3.893-5.987,6.567-5.987,2.763,0,6.282,2.484,6.282,6.2a12.749,12.749,0,0,1-.017,1.643l-9.009.08a2.771,2.771,0,0,0,2.244,1.342,4.024,4.024,0,0,0,1.813-.184,1.93,1.93,0,0,0,.95-.763h3.712a6.116,6.116,0,0,1-6.2,4.251,6.391,6.391,0,0,1-6.338-5.778" transform="translate(-177.521 -62.358)"/>
                  <path d="M580.872,306.948v-6.476c-.009-.647.088-1.666-.668-2.164a2.457,2.457,0,0,0-1.384-.376c-.587.018-2.123.362-2.141,1.409v7.607h-4.036V295h3.781a2.112,2.112,0,0,0-.027.717,4.259,4.259,0,0,1,3.076-1.157c2.723,0,5.385,2.273,5.378,4.7l0,7.688Z" transform="translate(-401.209 -62.502)"/>
                  <path d="M476.226,303.557a2.923,2.923,0,1,1,3.09-2.919,3.007,3.007,0,0,1-3.09,2.919m-.01-9.214a6.3,6.3,0,1,0,6.678,6.29,6.5,6.5,0,0,0-6.678-6.29" transform="translate(-311.798 -62.31)"/>
                </g>
              </svg>
            </a>
            <a class="fbhs-company ${activeDomainGroup ==='fypon' ? 'active' : ''}" href="https://fypon.com/?utm_source=${domain}&utm_medium=referral&utm_campaign=${settings.utmCampaign}" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="70.973" height="19.7" viewBox="0 0 70.973 19.7" class="fbhs-company-logo">
                <title>Fypon Decorative Polyurethane Millwork</title>
                <g transform="translate(-248.162 -249.094)">
                  <path d="M270.522,249.094c-.574,0-1.353.115-2.817.23s-3.245.23-5.083.23c-1.436,0-2.872-.058-4.307-.115s-2.871-.144-4.308-.23v1.034c2.5.287,2.7.43,2.7.947v4.588a9.762,9.762,0,0,1,4.824.423V250.53h2.355c3.07,0,5.375.047,6.249,3.056l.986.039.09-3.956C271.211,249.3,271.125,249.094,270.522,249.094Z" transform="translate(-4.355)"/>
                  <path d="M256.2,288.589v7.05c0,1.149-.086,1.292-2.872,1.436v.976c1.838-.086,3.676-.172,5.514-.172s3.676.086,5.513.172v-.976c-3.245-.144-3.332-.287-3.332-2.614v-3.74a9.441,9.441,0,0,1-2.785-1.092A14.778,14.778,0,0,0,256.2,288.589Z" transform="translate(-3.852 -29.429)"/>
                  <path d="M265.081,279.005c-.284,1.264-1.681,2.231-3.877,2.573a10.349,10.349,0,0,1-6.608-1.211c-1.794-1.08-4.3-2.234-6.435-1.365.636-1,2.167-1.708,4.217-2.027a9.008,9.008,0,0,1,6.019,1.036c2.122,1.239,3.864,1.768,5.315,1.542a3.06,3.06,0,0,0,1.368-.549Z" transform="translate(0 -20.682)"/>
                  <path d="M461.978,268.7a43.756,43.756,0,0,0,5.14.172l7.294,8.471c.23.259.488.6.574.6.115,0,.143-.259.143-.488v-5.743c0-1.58-.345-1.9-2.24-2.039V268.7c.919.086,1.81.172,2.728.172s1.809-.086,2.728-.172v.976c-1.723.144-2.068.46-2.068,2.039v11.516H474.7l-9.333-10.74-.2-.23h-.086c-.058.057-.086.086-.086.373v6.318c0,2.786.058,3.13,2.211,3.417v.861c-.861-.086-1.752-.172-2.613-.172s-1.752.086-2.613.172v-.861c2.011-.287,2.068-.632,2.068-3.417v-7.381a1.945,1.945,0,0,0-2.068-2.01Z" transform="translate(-159.322 -14.609)"/>
                  <g transform="translate(317.448 266.925)">
                    <path d="M520.861,320.776a.86.86,0,1,1,.841-.859A.827.827,0,0,1,520.861,320.776Zm0-1.569a.712.712,0,1,0,.657.711A.668.668,0,0,0,520.861,319.206Zm-.17,1.2h-.156v-.952h.361c.23,0,.347.081.347.274a.244.244,0,0,1-.248.26l.266.418h-.177l-.246-.407h-.147Zm.175-.54c.117,0,.22-.012.22-.15,0-.115-.113-.128-.207-.128h-.188v.278Z" transform="translate(-520.015 -319.057)"/>
                  </g>
                  <path d="M341.165,268.025a7.606,7.606,0,0,0-6.621,3.35c-.346-1.918-1.926-3.178-4.723-3.178-1.551,0-3.1.172-4.422.172-.58,0-1.165-.019-1.752-.044a6.452,6.452,0,0,0-.916-.047,10.593,10.593,0,0,0-1.324.08c-.172.005-.345.011-.517.011a17.711,17.711,0,0,1-2.125-.172v.976c1.637.058,1.953.288,1.953.632,0,.258-.115.488-.517,1.12l-2.125,3.3c-.086.115-.144.259-.287.259-.114,0-.2-.172-.316-.345l-2.326-3.36c-.258-.373-.545-.689-.545-.947,0-.43.373-.632,1.809-.661V268.2c-1.12.086-2.239.172-3.331.172-1.55,0-3.1-.086-4.652-.172v.862a2.191,2.191,0,0,1,1.637.976l4.279,6.088v4.566c0,.89-.316,1.005-2.326,1.177v.861c1.608-.086,2.958-.172,4.279-.172s2.67.086,4.279.172v-.861c-2.125-.172-2.441-.287-2.441-1.177v-5.054l2.5-3.676c.887-1.319,1.522-2.275,2.333-2.631.383.158.482.413.482.908v10.453c0,.89-.316,1.005-2.039,1.177v.861c1.436-.086,2.786-.172,4.107-.172s2.67.086,4.106.172v-.861c-2.068-.172-2.384-.287-2.384-1.177V276.18h2.154A5.91,5.91,0,0,0,333.342,275c-.01.154-.017.309-.017.464a7.851,7.851,0,1,0,7.84-7.437Zm-13.928,7.294v-6.146h.575c2.3,0,3.36,1.149,3.36,2.9C331.171,273.165,330.769,275.233,327.237,275.319Zm13.928,6.72c-2.412,0-3.7-2.585-3.7-6.576s1.292-6.576,3.7-6.576,3.7,2.584,3.7,6.576S343.577,282.038,341.165,282.038Z" transform="translate(-44.906 -14.106)"/>
                </g>
              </svg>
            </a>
            <a class="fbhs-company ${activeDomainGroup ==='solarinnovations' ? 'active' : ''}" href="https://solarinnovations.com/?utm_source=${domain}&utm_medium=referral&utm_campaign=${settings.utmCampaign}" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" height="22" width="166" viewBox="0 0 238 32" class="fbhs-company-logo">
                <title>Solar Innovations Architectural Glazing Systems</title>
                <path d="M38.75 1.25 38 3a6.76 6.76 0 0 0-4-1.25c-2 0-3.25.75-3.25 2C30.75 7.5 39 5.5 39 11c0 2.25-2 4-5.25 4A9.1 9.1 0 0 1 28 12.75l.75-1.5a7.94 7.94 0 0 0 5 2c2 0 3.5-.75 3.5-2.25 0-4-8.5-1.75-8.5-7.25C28.75 1.5 31 0 34 0a9.57 9.57 0 0 1 4.75 1.25Zm19 6.25a7.75 7.75 0 0 1-15.5 0 7.75 7.75 0 0 1 15.5 0ZM44 7.5a6 6 0 0 0 12 0 6 6 0 0 0-12 0Zm26.25 5.75V15H62V0h1.75v13.25h6.5zm5.25-2L73.75 15H72l6.75-15h1.75L87 15h-1.75l-1.75-3.75Zm4-9.25-3.25 7.5h6.5L79.5 2ZM97 10.25h-4.75V15H90.5V0H96c3.75 0 6 1.75 6 5 0 2.5-1.25 4.25-3.25 4.75L102 15h-1.75ZM96 8.5c2.75 0 4.25-1 4.25-3.5 0-2.25-1.5-3.25-4.25-3.25h-3.75V8.5Z"/>
                <path d="M38.75 1.25 38 3a6.76 6.76 0 0 0-4-1.25c-2 0-3.25.75-3.25 2C30.75 7.5 39 5.5 39 11c0 2.25-2 4-5.25 4A9.1 9.1 0 0 1 28 12.75l.75-1.5a7.94 7.94 0 0 0 5 2c2 0 3.5-.75 3.5-2.25 0-4-8.5-1.75-8.5-7.25C28.75 1.5 31 0 34 0a9.57 9.57 0 0 1 4.75 1.25Zm19 6.25a7.75 7.75 0 0 1-15.5 0 7.75 7.75 0 0 1 15.5 0ZM44 7.5a6 6 0 0 0 12 0 6 6 0 0 0-12 0Zm26.25 5.75V15H62V0h1.75v13.25h6.5zm5.25-2L73.75 15H72l6.75-15h1.75L87 15h-1.75l-1.75-3.75Zm4-9.25-3.25 7.5h6.5L79.5 2ZM97 10.25h-4.75V15H90.5V0H96c3.75 0 6 1.75 6 5 0 2.5-1.25 4.25-3.25 4.75L102 15h-1.75ZM96 8.5c2.75 0 4.25-1 4.25-3.5 0-2.25-1.5-3.25-4.25-3.25h-3.75V8.5Zm9.75 6.5V0h1.75v15h-1.75zm14.75 0-9-12v12h-1.75V0h1.75l9 12V0h1.75v15h-1.75zm14.75 0-9-12v12h-1.75V0h1.75l9 12V0H137v15h-1.75zm18.25-7.5a7.75 7.75 0 0 1-15.5 0 7.75 7.75 0 0 1 15.5 0Zm-13.75 0a6 6 0 0 0 12 0 6 6 0 0 0-12 0Zm18.5 7.5-6-15H154l5 13 5.25-13H166l-6 15h-1.75zm8.25-3.75L165 15h-1.75l6.5-15h1.75l6.75 15h-1.75l-1.75-3.75ZM170.75 2l-3.5 7.5H174L170.75 2Zm10.75-.25V15H180V1.75h-5V0h11.5v1.75h-5zM186.75 15V0h1.75v15h-1.75zM205 7.5a7.75 7.75 0 0 1-15.5 0 7.75 7.75 0 0 1 15.5 0Zm-13.75 0a6 6 0 0 0 12 0 6 6 0 0 0-12 0ZM216.5 15l-8.75-12v12H206V0h1.75l9 12V0h1.5v15h-1.75zM230 1.25 229.25 3A7.47 7.47 0 0 0 225 1.75c-1.75 0-3 .75-3 2 0 3.75 8.25 1.75 8.25 7.25 0 2.25-2.25 4-5.5 4a8.43 8.43 0 0 1-5.5-2.25l.75-1.5a7.43 7.43 0 0 0 5 2c2 0 3.5-.75 3.5-2.25 0-4-8.5-1.75-8.5-7.25C220 1.5 222 0 225.25 0A9.57 9.57 0 0 1 230 1.25Zm8 2.25a3.5 3.5 0 0 1-7 0 3.5 3.5 0 0 1 7 0Zm-.5 0a3 3 0 0 0-3-3 3 3 0 0 0 0 6 3 3 0 0 0 3-3Zm-2.25.5 1 1.25h-.75L234.75 4h-1v1.25h-.5v-3.5h1.5c.75 0 1.25.25 1.25 1a1.15 1.15 0 0 1-.75 1.25Zm-.5-.5a.66.66 0 0 0 .75-.75c0-.25-.25-.5-.75-.5h-1V3.5Zm-132 16H28v-1.25h74.75v1.25zm128.25 0H105.75v-1.25H231v1.25zM16 9v22.25H.75V9H16m.75-.75H0V32h16.75V8.25Zm7 23.75H17.5V8.25h6.25V32zm-7-24.5H0V.25h16.75V7.5zM23 1v5.75h-4.75V1H23m.75-.75H17.5V7.5h6.25V.25ZM30 29.75 29 32h-1l3.75-8.5h1L36.5 32h-1l-1-2.25Zm2.25-5.25-2 4.5h4l-2-4.5Zm9 4.75h-3V32h-1v-8.5h3.25c2.25 0 3.5 1 3.5 2.75A2.53 2.53 0 0 1 42 29l2 3h-1Zm-.75-1c1.75 0 2.5-.5 2.5-2 0-1.25-.75-1.75-2.5-1.75h-2.25v3.75Zm11.75-3.5-.5.75a3.47 3.47 0 0 0-2.5-1.25 3.42 3.42 0 0 0-3.5 3.5 3.37 3.37 0 0 0 3.5 3.25 3.21 3.21 0 0 0 2.5-1l.5.75a4.61 4.61 0 0 1-3 1.25 4.26 4.26 0 1 1 0-8.5 4.14 4.14 0 0 1 3 1.25Zm7.5 7.25v-3.75H54.5V32h-1v-8.5h1v3.75h5.25V23.5h1V32h-1zm2.75 0v-8.5h1V32h-1zm5.75-7.5V32h-1v-7.5H64.5v-1H71v1h-2.75zm4.5 0v2.75H77v1h-4.25V31h5v1h-6v-8.5h5.75v1h-4.75zm13.25.25-.75.75a3.08 3.08 0 0 0-2.5-1.25 3.42 3.42 0 0 0-3.5 3.5 3.37 3.37 0 0 0 3.5 3.25 2.9 2.9 0 0 0 2.5-1l.75.75A5.27 5.27 0 0 1 82.75 32a4.26 4.26 0 1 1 0-8.5A5.27 5.27 0 0 1 86 24.75Zm3.75-.25V32h-1v-7.5H86v-1h6.5v1h-2.75zm10.5 4a3.16 3.16 0 0 1-3.5 3.5C94.5 32 93 30.75 93 28.5v-5h1v5c0 1.75 1 2.5 2.75 2.5a2.24 2.24 0 0 0 2.5-2.5v-5h1Zm5.5.75H103V32h-1v-8.5h3.25c2.25 0 3.5 1 3.5 2.75a2.53 2.53 0 0 1-2 2.75l2 3h-1Zm-.5-1c1.5 0 2.5-.5 2.5-2 0-1.25-1-1.75-2.5-1.75H103v3.75Zm5.75 1.5L110 32h-1l3.75-8.5h1l4 8.5h-1.25l-.75-2.25Zm2.25-5.25L111.5 29h3.75l-2-4.5Zm10 6.5v1h-4.75v-8.5h1V31h3.75zm10.5-3.25V31a7.09 7.09 0 0 1-3.25 1 4.26 4.26 0 1 1 0-8.5 6.25 6.25 0 0 1 3.25 1l-.5.75a5.24 5.24 0 0 0-2.75-1 3.5 3.5 0 0 0 0 7 6 6 0 0 0 2.25-.75v-2.75Zm6.5 3.25v1h-4.75v-8.5h1V31h3.75z"/>
                <path d="M142 29.75 141 32h-1l3.75-8.5h1l4 8.5h-1.25l-.75-2.25Zm2.25-5.25L142.5 29h3.75l-2-4.5ZM150 31h5.75v1h-7v-.75l5.5-6.75h-5.5v-1h6.75v.75L150 31zm6.75 1v-8.5h1V32h-1zm9.25 0-5.25-6.75V32h-1v-8.5h1l5.25 6.75V23.5h1V32h-1zm9.75-4.25V31a6.25 6.25 0 0 1-3.25 1 4.28 4.28 0 0 1-4.5-4.25c0-2.5 2-4.25 4.75-4.25a6.13 6.13 0 0 1 3 1l-.5.75a5.28 5.28 0 0 0-2.5-1 3.51 3.51 0 1 0 0 7 8 8 0 0 0 2.25-.75v-2.75Zm9.75-3.5-.5 1a2.76 2.76 0 0 0-2.25-.75c-1 0-1.75.25-1.75 1 0 2.25 4.75 1 4.75 4.25 0 1.5-1.25 2.25-3 2.25a6 6 0 0 1-3.5-1.25l.5-1a3.64 3.64 0 0 0 3 1.25c1.25 0 2-.5 2-1.25 0-2.25-5-1-5-4 0-1.5 1.25-2.25 3-2.25a5 5 0 0 1 2.75.75Zm4.75 7.75h-1v-3l-3.5-5.5H187l2.75 4.5 2.75-4.5h1l-3.25 5.5v3zm9.25-7.75-.5 1a3.28 3.28 0 0 0-2.5-.75c-1 0-1.75.25-1.75 1 0 2.25 4.75 1 4.75 4.25 0 1.5-1.25 2.25-3 2.25a4.75 4.75 0 0 1-3.25-1.25l.5-1A3.18 3.18 0 0 0 196.5 31c1.25 0 2-.5 2-1.25 0-2.25-4.75-1-4.75-4 0-1.5 1.25-2.25 3-2.25a5 5 0 0 1 2.75.75Zm4 .25V32h-1v-7.5h-2.75v-1h6.75v1h-3zm4.75 0v2.75h4.25v1h-4.25V31h5v1h-6v-8.5H213v1h-4.75zm14 7.5v-7l-3 6h-.75l-3-6v7h-1v-8.5h1.25l3.25 6 3-6h1.25V32h-1zm8.25-7.75-.5 1a3 3 0 0 0-2.25-.75c-1.25 0-2 .25-2 1 0 2.25 5 1 5 4.25 0 1.5-1.25 2.25-3.25 2.25a4.75 4.75 0 0 1-3.25-1.25l.5-1A3.18 3.18 0 0 0 227.5 31c1.25 0 2-.5 2-1.25 0-2.25-4.75-1-4.75-4 0-1.5 1.25-2.25 3-2.25a5 5 0 0 1 2.75.75Z"/>
              </svg>
            </a>
          </div>
        </div>
      </div> 
    </div>
  </nav>
  `;

  shadowRoot.innerHTML = `
    <style>
      ${styles}
    </style>
    ${template}
  `;

  let openElements  = shadowRoot.querySelectorAll('.fbhs-modal-open'),
      closeElements = shadowRoot.querySelectorAll('.fbhs-modal-close'),
      modalOverlay  = shadowRoot.querySelector('.fbhs-overlay');

  openElements.forEach(openElement => {
    openElement.addEventListener('click', function handleClick(event) {
      modalOverlay.classList.add('active');
      document.body.style.setProperty("overflow", "hidden", "important");
      document.body.style.setProperty("height", "100vh", "important");
    });
  });

  closeElements.forEach(closeElement => {
    closeElement.addEventListener('click', function handleClick(event) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = null;
      document.body.style.height = null;
    });
  });

  targetElement.prepend(navWrapper);

})();
