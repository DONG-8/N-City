import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface VendingMachineState{
  vendingMachineDialogOpen:boolean
  nftnumber:Number
  productNum:Number
}

const initialState : VendingMachineState={
  vendingMachineDialogOpen : false,
  nftnumber:1,
  productNum:1,
}

export const vendingMachineSlice = createSlice({
  name:'vendingMachine',
  initialState,
  reducers:{
    openVendingMachineDialog:(state,action: PayloadAction<Number>) =>{ 
        state.nftnumber = action.payload
        state.vendingMachineDialogOpen = true
      },
    closeVendingMachineDialogOpen:(state)=>{state.vendingMachineDialogOpen = false},
    setProductNum :(state,action:PayloadAction<Number>)=>
    {state.productNum = action.payload }
  }
})
export const {
  openVendingMachineDialog,
  closeVendingMachineDialogOpen,
  setProductNum
} = vendingMachineSlice.actions

export default vendingMachineSlice.reducer