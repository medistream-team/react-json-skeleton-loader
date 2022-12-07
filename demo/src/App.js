import JsonSkeletonLoader from 'react-json-skeleton-loader'
import React, { useState } from 'react'
import './App.css'

const App = () => {
  const DEFAULT_SKELETON_VALUE = `[["box", "title + text:3"], ["text:3"]]`
  const DEFAULT_THUMBNAIL_VALUE = `[["box", "text:2"]]`
  const DEFAULT_AVATAR_VALUE = `[["circle", "text:2"]]`
  const DEFAULT_FIGURE_VALUE = `[["box:120/90", "text:2"]]`
  const DEFAULT_SECOND_FIGURE_VALUE = `[["box:90/120", "text:2"]]`
  const [defaultSkeletonValue, setDefaultSkeletonValue] = useState(JSON.parse(DEFAULT_SKELETON_VALUE))



  const [thumbnail, setThumbnail] = useState(JSON.parse(DEFAULT_THUMBNAIL_VALUE))
  const [avatar, setAvatar] = useState(JSON.parse(DEFAULT_AVATAR_VALUE))
  const [figure, setFigure] = useState(JSON.parse(DEFAULT_FIGURE_VALUE))
  const [secondFigure, setSecondFigure] = useState(JSON.parse(DEFAULT_SECOND_FIGURE_VALUE))

  return (
    <>
      <header className='header'>
        <img
          className='skeleton-loader-img'
          src='/img/SkeletonLoader.svg'
          alt='skeletonLoaderLogo'
        />
        <h1 className='skeleton-loader-text'>React Json Skeleton Loader</h1>
        <div className='skeleton-loader-link'>A loader component that can be designed with simple markup. - <a href='https://github.com/medistream-team/react-skeleton-loader'><strong>GitHub</strong></a></div>
      </header>
      <main>
        <section className='section-default'>
          <div className='main-section-default'>
            <div className='main-section-default-skeletonloader'>
              <JsonSkeletonLoader
                defaultSizes={{
                  box: 100,
                  circle: 100,
                }}
                content={defaultSkeletonValue}
              />
            </div>
            <textarea
              className='main-section-default-textarea'
              defaultValue={DEFAULT_SKELETON_VALUE}
              onChange={e => setDefaultSkeletonValue(JSON.parse(e.target.value))}
            />
          </div>
        </section>
        <section className='section-getting-started'>
          <h2>Getting Started</h2>
          <h3>Installation</h3>
          <div className='getting-started-install'>
            <div className='getting-started-install-code'>
              npm install <span className='npm-name'>react-json-skeleton-loader</span>
            </div>
          </div>
          <div className='getting-started-import'>
            <div className='getting-started-import-code'>
              import <span className='npm-name'>JsonSkeletonLoader</span> from <span className='npm-name'>'react-json-skeleton-loader'</span>
            </div>
          </div>
        </section>
        <section className='section-examples'>
          <h2>Examples</h2>
          <h3 className='section-examples-text'>
            Text with thumbnail
          </h3>
          <div className='section-examples-temp'>
            <div className='temp-json-skeleton-loader'>
              <JsonSkeletonLoader
                defaultSizes={{
                  box: 50,
                  circle: 100,
                }}
                content={thumbnail} />
            </div>
            <textarea
              className='temp-textarea'
              defaultValue={DEFAULT_THUMBNAIL_VALUE}
              onChange={(e) => setThumbnail(JSON.parse(e.target.value))}
            />
          </div>

          <h3 className='section-examples-text'>Text with avatar</h3>
          <div className='section-examples-temp'>
            <div className='temp-json-skeleton-loader'>
              <JsonSkeletonLoader
                defaultSizes={{
                  box: 50,
                  circle: 50,
                }}
                content={avatar} />
            </div>
            <textarea
              className='temp-textarea'
              defaultValue={DEFAULT_AVATAR_VALUE}
              onChange={(e) => setAvatar(JSON.parse(e.target.value))}
            />
          </div>

          <h3 className='section-examples-text'>Text with figure</h3>
          <div className='section-examples-temp'>
            <div className='temp-json-skeleton-loader'>
              <JsonSkeletonLoader
                defaultSizes={{
                  box: 50,
                  circle: 100,
                }}
                content={figure} />
            </div>
            <textarea
              className='temp-textarea'
              defaultValue={DEFAULT_FIGURE_VALUE}
              onChange={(e) => setFigure(JSON.parse(e.target.value))}
            />
          </div>
          <div className='section-examples-temp'>
            <div className='temp-json-skeleton-loader'>
              <JsonSkeletonLoader
                defaultSizes={{
                  box: 50,
                  circle: 100,
                }}
                content={secondFigure} />
            </div>
            <textarea
              className='temp-textarea'
              defaultValue={DEFAULT_SECOND_FIGURE_VALUE}
              onChange={(e) => setSecondFigure(JSON.parse(e.target.value))}
            />
          </div>

        </section>
        <section className='section-properties'>
          <div className='section-properties-container'>
            <h2>Properties (options)</h2>
            <div className='options-name'><b>Disable animation</b></div>
            <div className='options-container'>
              <div className='options-container-item'>
                <JsonSkeletonLoader
                  defaultSizes={{
                    box: 70,
                    circle: 100,
                  }}
                  options={{
                    animation: false
                  }}
                  content={[['box', 'text:3']]}
                />
              </div>
              <div className='options-code'>
                <code>
                  {`<JsonSkeletonLoader options = {{animation: false}} />`}
                </code>
              </div>
            </div>

            <div className='options-name'><b>Animation speed</b></div>
            <div className='options-container'>
              <div className='options-container-item'>
                <JsonSkeletonLoader
                  defaultSizes={{
                    box: 70,
                    circle: 100,
                  }}
                  options={{
                    speed: 0.5
                  }}
                  content={[['box', 'text:3']]}
                />
              </div>
              <div className='options-code'>
                <code>
                  {`<JsonSkeletonLoader options = {{speed: 0.5}} />`}
                </code>
              </div>
            </div>

            <div className='options-name'><b>Radius</b></div>
            <div className='options-container'>
              <div className='options-container-item'>
                <JsonSkeletonLoader
                  defaultSizes={{
                    box: 70,
                    circle: 100,
                  }}
                  options={{
                    radius: 15
                  }}
                  content={[['box', 'text:3']]}
                />
              </div>
              <div className='options-code'>
                <code>
                  {`<JsonSkeletonLoader options = {{radius: 15}} />`}
                </code>
              </div>
            </div>

            <div className='options-name'><b>Colors</b></div>
            <div className='options-container'>
              <div className='options-container-item'>
                <JsonSkeletonLoader
                  defaultSizes={{
                    box: 70,
                    circle: 100,
                  }}
                  options={{
                    primaryColor: '#ffb0b0',
                    secondaryColor: '#4c8bf5'
                  }}
                  content={[['box', 'text:3']]}
                />
              </div>
              <div className='options-code'>
                <code>
                  {`<JsonSkeletonLoader options = {{primaryColor: '#ffb0b0', secondaryColor: '#4c8bf5'}} />`}
                </code>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className='footer-text'>Copyright © 2022. Built by INTEGRATION Corp.</div>
        <div className='footer-text'>This project is distributed under MIT license.</div>
      </footer>
    </>
  );
}

export default App;
