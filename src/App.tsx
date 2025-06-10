
import { BrowserRouter } from 'react-router-dom'
import { ProviderTreeWrapper } from '@/context/ProviderTreeWrapper'
import AppRoutes from '@/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <ProviderTreeWrapper>
        <AppRoutes />
      </ProviderTreeWrapper>
    </BrowserRouter>
  )
}
