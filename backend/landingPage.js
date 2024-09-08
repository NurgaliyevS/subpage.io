import mongoose from "mongoose";

const LandingPageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: String,
  template: { type: String },
  customizations: {
    theme: { type: String, default: 'light' },
    font: { type: String, default: 'Lato' },
  },
  content: {
    constructor: [{
      type: { type: String },
      content: mongoose.Schema.Types.Mixed
    }],
    mainHeadline: { type: String },
    mainDescription: { type: String },
    inputField: { type: String },
    ctaText: { type: String },
    showUserIcon: { type: Boolean, default: true },
    showEmailInput: { type: Boolean, default: true },
    showCTAButton: { type: Boolean, default: true },
    userName: { type: String },
    userImage: { type: String },
    products: {
      isOpenProduct: { type: Boolean, default: false },
      productName: String,
      productDescription: String,
      productPrice: Number,
      productImage: String
    }
  },
  personalLink: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  dateModified: { type: Date, default: Date.now }
});

const LandingPage = mongoose.models.LandingPage || mongoose.model("LandingPage", LandingPageSchema);

export default LandingPage;
