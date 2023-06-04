const model = require("../model/model");

const lockBNB = async (req, res) => {
  try {
    var bnbLock = new model.bnbLockInfo({
      walletAddress: req.body.walletAddress,
      lockTitle: req.body.title,
      total_Locked_Amount: req.body.totalLockedAmount,
      Owner: req.body.owner,
      unLock_Date: new Date(req.body.unLockDate || Date.now()),
      Lock_Date: new Date(req.body.lockDate || Date.now()),
      // TGE_Date: req.body.TgeDate || Date.now(),
      TGE_Date: req.body.TgeDate,
      tGE_Percentage: req.body.tgePercentage,
      cycle_Days: req.body.cycleDays,
      cycle_ReleasePercentage: req.body.cycleRelease,
      network: req.body.newtork,
      chainID: req.body.chainID,
      lockID: req.body.lockID,
    });

    await bnbLock.save();

    res.status(200).json({ data: bnbLock, msg: "BNB locked successfully", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong", success: false });
  }
};

// delete locked BNB

const deleteLockedBNB = async (req, res) => {
  try {
    var lockedBNB = await model.bnbLockInfo.findOne({ _id: req.params.id });

    console.log(lockedBNB);

    if (lockedBNB != null) {
      await model.bnbLockInfo.findOneAndDelete({ _id: req.params.id });

      res
        .status(200)
        .json({ success: true, msg: "locked bnb unlocked successfully" });
    } else {
      res.status(404).json({ success: false, msg: "bnb locked already" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, msg: "something went wrong" });
  }
};

// get bnb for listing Page
const getlockedBNBforListing = async (req, res) => {
  try {
    var data = await model.bnbLockInfo.find({ chainID: req.body.chainID });

    if (data != null) {
      data = data.reverse();
      // console.log("data", data)

      // get Data that has sameTokens
      var walletAddress = [];
      data.forEach((item, index) => {
        walletAddress.push(item.walletAddress);
      });

      // get Unique items in aray
      var uniqueAry = walletAddress.filter((v, i, a) => a.indexOf(v) === i);

      console.log("this is uniq Ary", uniqueAry);

      var multPleAry = [];
      uniqueAry.forEach((item, index) => {
        var price = 0;
        var chainID = "";
        var network = "";
        data.forEach((item2, index) => {
          if (item == item2.walletAddress) {
            price += Number(item2.total_Locked_Amount);
            chainID = item2.chainID;
            network = item2.network;
          }
        });

        multPleAry.push({
          walletAddress: item,
          total_Locked_Amount: price,
          chainID: chainID,
          network: network,
        });
      });

      data = multPleAry;

      var itemPerPage = req.body.itemPerPage;
      var pageNum = req.body.pageNum;

      if (data.length > 0) {
        // console.log("these are tokens", tokens)
        var totalPages = Math.ceil(data.length / itemPerPage);

        // function to get pagination
        function paginate(array, page_size, page_number) {
          // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
          return array.slice(
            (page_number - 1) * page_size,
            page_number * page_size
          );
        }

        var itemList = await paginate(data, itemPerPage, pageNum);

        // console.log(filteredTokens)
        res.status(200).json({
          success: true,
          Data: itemList,
          length: data.length,
          totalPages: totalPages,
        });
      } else {
        res.status(404).json({ success: false, Data: [], length: 0 });
      }
    } else {
      res.status(404).json({ msg: "no data found", succeess: false, data: [] });
    }
  } catch (err) {
    res.status(500).jsno({ msg: "something went wrong", succeess: false });
  }
};

// get locked bnb by walletAddress and chainID
const getLockedBNBByWalletAddressAndChainID = async (req, res) => {
  try {
    if (!req.body.chainID || !req.body.walletAddress) {
      res.status(404).json({ msg: "invalid creditionals" });
    }

    var data = await model.bnbLockInfo.find({
      chainID: req.body.chainID,
      walletAddress: req.body.walletAddress,
    });

    if (data != null) {
      data = data.reverse();
      // console.log("data", data)

      // get Data that has sameTokens
      var walletAddress = [];
      data.forEach((item, index) => {
        walletAddress.push(item.walletAddress);
      });

      // get Unique items in aray
      var uniqueAry = walletAddress.filter((v, i, a) => a.indexOf(v) === i);

      console.log("this is uniq Ary", uniqueAry);

      var multPleAry = [];
      uniqueAry.forEach((item, index) => {
        var price = 0;
        var chainID = "";
        var network = "";
        data.forEach((item2, index) => {
          if (item == item2.walletAddress) {
            price += Number(item2.total_Locked_Amount);
            chainID = item2.chainID;
            network = item2.network;
          }
        });

        multPleAry.push({
          walletAddress: item,
          total_Locked_Amount: price,
          chainID: chainID,
          network: network,
        });
      });

      data = multPleAry;

      var itemPerPage = req.body.itemPerPage;
      var pageNum = req.body.pageNum;

      if (data.length > 0) {
        // console.log("these are tokens", tokens)
        var totalPages = Math.ceil(data.length / itemPerPage);

        // function to get pagination
        function paginate(array, page_size, page_number) {
          // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
          return array.slice(
            (page_number - 1) * page_size,
            page_number * page_size
          );
        }

        var itemList = await paginate(data, itemPerPage, pageNum);

        // console.log(filteredTokens)
        res.status(200).json({
          success: true,
          Data: itemList,
          length: data.length,
          totalPages: totalPages,
        });
      } else {
        res.status(404).json({ success: false, Data: [], length: 0 });
      }
    } else {
      res.status(404).json({ msg: "no data found", succeess: false, data: [] });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "something went wrong", succeess: false });
  }
};

// get lcoked all Locked BNB

const getAllLockedBNBBYWalletAddres = async (req, res) => {
  try {
    var lockedData = await model.bnbLockInfo.find({
      walletAddress: req.body.walletAddress,
    });

    if (lockedData.length > 0) {
      res.status(200).json({ success: true, data: lockedData });
    } else {
      res.status(404).json({ success: false, data: [] });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "something went wrong" });
  }
};

// const get locked BNB by _id

const getLockedBNBByID = async (req, res) => {
  try {
    var data = await model.bnbLockInfo.find({ _id: req.body.id });

    if (data.length > 0) {
      res.status(200).json({ success: true, data: data });
    } else {
      res.status(404).json({ success: false, msg: "no data found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, msg: "something went wrong in server" });
  }
};

// filtered locked bnb

const filtereLockedBNB = async (req, res) => {
  try {
    var bnbInfo = await model.bnbLockInfo.find({
      walletAddress: req.body.walletAddress,
      chainID: req.body.chainID,
    });

    if (bnbInfo != null) {
      var data = bnbInfo;

      var walletAddress = [];
      data.forEach((item, index) => {
        walletAddress.push(item.walletAddress);
      });

      // get Unique items in aray
      var uniqueAry = walletAddress.filter((v, i, a) => a.indexOf(v) === i);

      console.log("this is uniq Ary", uniqueAry);

      var multPleAry = [];
      uniqueAry.forEach((item, index) => {
        var price = 0;
        var chainID = "";
        var network = "";
        data.forEach((item2, index) => {
          if (item == item2.walletAddress) {
            price += Number(item2.total_Locked_Amount);
            chainID = item2.chainID;
            network = item2.network;
          }
        });

        multPleAry.push({
          walletAddress: item,
          total_Locked_Amount: price,
          chainID: chainID,
          network: network,
        });
      });

      data = multPleAry;

      res.status(200).json({ success: true, data: data });
    } else {
      res.status(200).json({ success: true, data: [] });
    }
  } catch (err) {
    res.status(500).json({ success: false, msg: "something went wrong" });
  }
};

// updated locked bNB

const updatedLockedBNB = async (req, res) => {
  try {
    await await model.bnbLockInfo.findOneAndUpdate(
      { _id: req.body.id },
      req.body
    );

    res.status(200).json({ succeess: true, msg: "bnb updated successfully" });
  } catch (err) {
    res.status(500).json({ succeess: false, msg: "something went wrong" });
  }
};

const lockBNBObj = {
  lockBNB,
  deleteLockedBNB,
  getlockedBNBforListing,
  getLockedBNBByWalletAddressAndChainID,
  getAllLockedBNBBYWalletAddres,
  getLockedBNBByID,
  deleteLockedBNB,
  filtereLockedBNB,
  updatedLockedBNB,
};

module.exports = lockBNBObj;
