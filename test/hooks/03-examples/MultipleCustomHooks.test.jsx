import { fireEvent, render, screen } from "@testing-library/react"
import { MultipleCustomHooks } from "../../../src/03-examples"
import { useCounter } from "../../../src/hooks/useCounter"
import { useFetch } from "../../../src/hooks/useFetch"

jest.mock('../../../src/hooks/useFetch')
jest.mock('../../../src/hooks/useCounter')

describe('Pruebas en <MultipleCustomHook />', () => { 
    
    const mockIncrement = jest.fn()
    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    })

    beforeEach( () => {
        jest.clearAllMocks()
    })

    test('Debe de mostrar el componente por defecto', () => { 
        
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null,
        })

        render( <MultipleCustomHooks/> )
        
        expect( screen.getAllByText('Loading...'))
        expect( screen.getAllByText('BreakingBad Quotes'))

        const nextButton = screen.getByRole('button', {name: 'Next quote'})
        expect( nextButton.disabled ).toBeTruthy()

        // screen.debug()

    })

    test('Debe de mostar un Quote', () => { 

        useFetch.mockReturnValue({
            data: [{ author: 'Armando', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null,
        })

        render( <MultipleCustomHooks/> )
        expect( screen.getByText('Hola Mundo') ).toBeTruthy()
        expect( screen.getByText('Armando') ).toBeTruthy()

        const nextButton = screen.getByRole('button', {name: 'Next quote'})
        expect( nextButton.disabled ).toBeFalsy()
    })

    test('Debe de llamar la función de incrementar', () => { 


        useFetch.mockReturnValue({
            data: [{ author: 'Armando', quote: 'Hola Mundo' }],
            isLoading: false,
            hasError: null,
        })


        render( <MultipleCustomHooks/> )
        const nextButton = screen.getByRole('button', {name: 'Next quote'})
        fireEvent.click( nextButton )

        expect( mockIncrement ).toHaveBeenCalled()

    })

})