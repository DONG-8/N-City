import { createSlice,PayloadAction } from '@reduxjs/toolkit'

interface VendingMachineState{
  vendingMachineDialogOpen:boolean
  nftnumber:Number
}

const initialState : VendingMachineState={
  vendingMachineDialogOpen : false,
  nftnumber:1
}

export const vendingMachineSlice = createSlice({
  name:'vendingMachine',
  initialState,
  reducers:{
    openVendingMachineDialog:(state,action: PayloadAction<Number>) =>{ 
        state.nftnumber = action.payload
        state.vendingMachineDialogOpen = true
      },
    closeVendingMachineDialogOpen:(state)=>{state.vendingMachineDialogOpen = false}
  }
})
export const {
  openVendingMachineDialog,
  closeVendingMachineDialogOpen
} = vendingMachineSlice.actions

export default vendingMachineSlice.reducer