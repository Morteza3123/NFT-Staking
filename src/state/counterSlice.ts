import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: '',
  library: null,
  chainId: null,
  rewardTokenContract: null,
  collectionContract: null,
  nftStakingContract: null
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setAccount: (state:any, action:any) => {
      state.account = action.payload;
    },
    setLibrary: (state:any, action:any) => {
      state.library = action.payload
    },
    setChainId: (state:any, action:any) => {
      state.chainId = action.payload
    },
    setRewardTokenContract: (state:any, action:any) => {
      state.rewardTokenContract = action.payload
    },
    setCollectionContract: (state:any, action:any) => {
      state.collectionContract = action.payload
    },
    setNftStakingContract: (state:any, action:any) => {
      state.nftStakingContract = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAccount, setLibrary, setChainId, setRewardTokenContract, setCollectionContract, setNftStakingContract,  } = counterSlice.actions

export default counterSlice.reducer