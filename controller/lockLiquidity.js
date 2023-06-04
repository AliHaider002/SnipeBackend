const model = require("../model/model");

const LockedLiquidty = async (req, res) => {
  try {
    var liquidtylock = new model.liquidityLockedInfo({
      walletAddress: req.body.walletAddress,
      liquidityAddress: req.body.liquidityAddress,
      liquidityTitle: req.body.title,
      total_Liquidity_Amount: req.body.total_Liquidity_Amount,
      total_Liquidity_Value: req.body.total_LiquidityValue,
      Owner: req.body.owner,
      unLock_Date: new Date(req.body.unLockDate || Date.now()),
      unLock_Date: req.body.unLockDate || Date.now(),
      Lock_Date: new Date(req.body.Lock_Date || Date.now()),
      // TGE_Date: new Date(req.body.TGE_Date || Date.now()),
      TGE_Date: req.body.TGE_Date,
      tGE_Percentage: req.body.tGE_Percentage,
      cycle_Days: req.body.cycle_Days,
      cycle_ReleasePercentage: req.body.cycle_ReleasePercentage,
      network: req.body.network,
      chainID: req.body.chainID,
      liquidityName: req.body.liquidityName,
      liquiditySymbol: req.body.liquiditySymbol,
      liquidityDecimal: req.body.liquidityDecimal,
      isLiquidityLocked: req.body.isLpLiquidity,
      liquidityID: req.body.liquidityID,
    });

    await liquidtylock.save();
    res
      .status(200)
      .json({ data: liquidtylock, msg: "locked token added Successfully", success: true });
  } catch (error) {
    console.log("this is error", error.message);
    res.status(500).json({
      msg: "something went wrong",
      success: false,
      error: error.message,
    });
  }
};

// searchToken by token address
const filterLockedLiquidty = async (req, res) => {
  try {
    var tokens = await model.liquidityLockedInfo.find({
      liquidityAddress: req.body.tokenAddress,
      chainID: req.body.chainID,
    });
    // console.log('this is token', tokens)

    if (tokens != null) {
      // get Data that has sameTokens
      var tokenAddress = [];
      tokens.forEach((item, index) => {
        tokenAddress.push(item.liquidityAddress);
      });

      // get Unique items in aray
      var uniqueAry = tokenAddress.filter((v, i, a) => a.indexOf(v) === i);

      console.log("tokens Array", uniqueAry);

      var multPleAry = [];
      uniqueAry.forEach((item, index) => {
        var price = 0;
        var tokenName = "";
        var tokenSymbol = "";
        tokens.forEach((item2, index) => {
          if (item == item2.tokenAddress) {
            var ary = [item2];
            price += Number(item2.total_Liquidity_Amount);
            tokenName = item2.liquidityTitle;
            tokenSymbol = item2.liquiditySymbol;
          }
        });

        multPleAry.push({
          tokenAddress: item,
          tokenName: tokenName,
          tokenSymbol: tokenSymbol,
          total_Locked_Amount: price,
        });
      });

      tokens = multPleAry;

      res.status(200).json({ success: true, data: tokens });
    } else {
      res.status(200).json({ success: false, data: [] });
    }
  } catch (err) {
    console.log("this is err", err);
    res
      .status(500)
      .json({ success: false, msg: "something went wrong serverside" });
  }
};

// get locked token by walletAddress and chainID
const getLockedLiquidtyByAddressAndChainID = async (req, res) => {
  try {
    var tokens;
    if (!req.body.walletAddress || !req.body.chainID) {
      res.status(404).json({ success: false, msg: "invalid Creditionals" });
    } else {
      tokens = await model.liquidityLockedInfo.find({
        walletAddress: req.body.walletAddress,
        chainID: req.body.chainID,
      });
    }

    console.log(tokens);

    // console.log('these are toen ', tokens)
    // workingHere

    // get Data that has sameTokens
    var tokenAddress = [];
    tokens.forEach((item, index) => {
      tokenAddress.push(item.liquidityAddress);
    });

    // get Unique items in aray
    var uniqueAry = tokenAddress.filter((v, i, a) => a.indexOf(v) === i);

    console.log("tokens Array", uniqueAry);

    var multPleAry = [];
    uniqueAry.forEach((item, index) => {
      var price = 0;
      var tokenName = "";
      var tokenSymbol = "";
      tokens.forEach((item2, index) => {
        if (item == item2.liquidityAddress) {
          var ary = [item2];
          price += Number(item2.total_Liquidity_Amount);
          tokenName = item2.liquidityTitle;
          tokenSymbol = item2.liquiditySymbol;
        }
      });

      multPleAry.push({
        tokenAddress: item,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        total_Locked_Amount: price,
      });
    });

    tokens = multPleAry;

    var itemPerPage = req.body.itemPerPage;
    var pageNum = req.body.pageNum;
    // console.log("tokens",tokens)
    if (tokens.length > 0) {
      var totalPages = Math.ceil(tokens.length / itemPerPage);

      // function to get pagination
      function paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      }

      var itemList = await paginate(tokens, itemPerPage, pageNum);

      res.status(200).json({
        success: true,
        data: itemList,
        totalPages: totalPages,
        itemLength: tokens.length,
      });
    } else {
      res.status(200).json({ success: false, data: [], msg: "no data found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "something went wrong serverside" });
  }
};

// get locked Tokens by walletAddress
const getLockedLiquidtyByWalletAddress = async (req, res) => {
  try {
    var tokens = await model.liquidityLockedInfo.find({
      walletAddress: req.body.walletAddress,
    });

    if (tokens.length > 0) {
      res.status(200).json({ success: true, data: tokens });
    } else {
      res.status(200).json({ success: false, data: [] });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "something went wrong serverside" });
  }
};

// get Token for listingPage
const getLiquidtyForListingPage = async (req, res) => {
  try {
    // console.log("this is body",req.body)

    var tokens = (tokens = await model.liquidityLockedInfo.find({
      chainID: req.body.chainID,
    }));

    tokens.reverse();

    // get Data that has sameTokens
    var tokenAddress = [];
    tokens.forEach((item, index) => {
      tokenAddress.push(item.liquidityAddress);
    });

    // get Unique items in aray
    var uniqueAry = tokenAddress.filter((v, i, a) => a.indexOf(v) === i);

    // console.log("tokens Array", uniqueAry);

    var multPleAry = [];
    uniqueAry.forEach((item, index) => {
      var price = 0;
      var tokenName = "";
      var tokenSymbol = "";
      tokens.forEach((item2, index) => {
        if (item == item2.liquidityAddress) {
          var ary = [item2];
          price += Number(item2.total_Liquidity_Amount);
          tokenName = item2.liquidityName;
          tokenSymbol = item2.liquiditySymbol;
        }
      });

      multPleAry.push({
        tokenAddress: item,
        tokenName: tokenName,
        tokenSymbol: tokenSymbol,
        total_Locked_Amount: price,
      });
    });

    tokens = multPleAry;

    var itemPerPage = req.body.itemPerPage;
    var pageNum = req.body.pageNum;

    if (tokens.length > 0) {
      // console.log("these are tokens", tokens)
      var totalPages = Math.ceil(tokens.length / itemPerPage);

      // function to get pagination
      function paginate(array, page_size, page_number) {
        // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
        return array.slice(
          (page_number - 1) * page_size,
          page_number * page_size
        );
      }

      var itemList = await paginate(tokens, itemPerPage, pageNum);
      // console.log(tokens, itemPerPage, pageNum, "hamza");
      // console.log(tokens);

      // console.log(itemList);

      // console.log(filteredTokens)
      res.status(200).json({
        success: true,
        Data: itemList,
        length: tokens.length,
        totalPages: totalPages,
      });
    } else {
      res.status(200).json({ success: false, Data: [], length: 0 });
    }
  } catch (err) {
    console.log();
    res
      .status(500)
      .json({ success: false, msg: "something went wrong serverside" });
  }
};

const getAllLiquidtyAddressUsingAddress = async (req, res) => {
  var tokens = await model.liquidityLockedInfo.find({
    liquidityAddress: req.body.tokenAddress,
  });

  if (tokens.length > 0) {
    console.log("tokens", tokens);
    res.status(200).json({ success: true, Data: tokens, length: 0 });
  } else {
    res.status(404).json({ success: false, Data: "no data found", length: 0 });
  }
};

// get token by ID
const getLiquidtyByID = async (req, res) => {
  try {
    var tokens = await model.liquidityLockedInfo.find({ _id: req.body.id });

    if (tokens.length > 0) {
      console.log("tokens", tokens);
      res.status(200).json({ success: false, Data: tokens });
    } else {
      res.status(404).json({ success: false, Data: "no data found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "somethign went wrong in server" });
  }
};

// deleteLockedTokenById
const deleteLockedLiquidtyById = async (req, res) => {
  try {
    var findToken = await model.liquidityLockedInfo.findOne({
      _id: req.body.id,
    });
    if (findToken != null) {
      await model.liquidityLockedInfo.findOneAndDelete({ _id: req.body.id });
      res
        .status(200)
        .json({ success: true, msg: "token deleted Successfully" });
    } else {
      res.status(404).json({ success: true, msg: "token not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "somethign went wrong in server" });
  }
};

// updated lcoked token

const updateLockedLiquidty = async (req, res) => {
  try {
    var findToken = await model.liquidityLockedInfo.find({ _id: req.body.id });

    if (findToken) {
      await model.liquidityLockedInfo.findOneAndUpdate(
        { _id: req.body.id },
        req.body
      );
      res
        .status(200)
        .json({ success: true, msg: "token updated successfully" });
    } else {
      res.status(404).json({ success: false, msg: "no any token found" });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ success: false, msg: "something went rong" });
  }
};

// Get all Liquidty
const getAllLiquidty = async (req, res) => {
  try {
    var liquidity = await model.liquidityLockedInfo.find();

    res.status(200).json({ success: true, liquidity });
  } catch (err) {
    res.status(200).json({ success: false, msg: "something went rong" });
  }
};

// making object to export uisng moduel
const liquidtyObj = {
  LockedLiquidty,
  deleteLockedLiquidtyById,
  filterLockedLiquidty,
  getAllLiquidtyAddressUsingAddress,
  getLiquidtyByID,
  getAllLiquidty,
  getLiquidtyForListingPage,
  getLockedLiquidtyByAddressAndChainID,
  getLockedLiquidtyByWalletAddress,
  updateLockedLiquidty,
};

module.exports = liquidtyObj;
