import { Physics } from '@react-three/cannon'
import { Sky } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Cubes } from './components/Cubes'
import FirstPointOfView from './components/FirstPointOfView'
import Ground from './components/Ground'
import Player from './components/Player'
import { TextureSelector } from './components/TextureSelector'

function App () {
  return (
    <>
      <div className='pointer'>+</div>
      <TextureSelector />
      <Canvas>
        <Sky />
        <ambientLight intensity={0.5} />
        <FirstPointOfView />
        <Physics>
          <Cubes />
          <Player />
          <Ground />
        </Physics>
      </Canvas>
    </>

  )
}

export default App
