import { createSlice } from '@reduxjs/toolkit'

interface VendingMachineState{
  vendingMachineDialogOpen:boolean
}

const initialState : VendingMachineState={
  vendingMachineDialogOpen : false
}

export const vendingMachineSlice = createSlice({
  name:'vendingMachine',
  initialState,
  reducers:{
    openVendingMachineDialog:(
      state,
    ) =>{
      state.vendingMachineDialogOpen = true
    },
    closeVendingMachineDialogOpen:(state)=>{
      state.vendingMachineDialogOpen = false
    }
  }
})
export const {
  openVendingMachineDialog,
  closeVendingMachineDialogOpen
} = vendingMachineSlice.actions

export default vendingMachineSlice.reducer