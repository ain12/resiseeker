import Image from 'next/image'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'

export default function Home() {
  return (
   <ClientOnly>
    <Container>
      
    </Container>
   </ClientOnly>
  )
}
