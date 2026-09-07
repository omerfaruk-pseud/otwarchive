require "spec_helper"

describe Confusable do

  context "it's internal skeleton" do
    it "is the word itself for words with all Latin letters" do
      expect(Confusable.internal_skeleton("Support")).to eq("Support")
    end

    it "has it's Latin counterpart for Cyrillic letters" do
      # notice the P being uppercase since letter case standardizing isn't in Confusable.internal_skeleton()
      expect(Confusable.internal_skeleton("SupРort")).to eq("SupPort")
    end

    it "has separated characters for confusables with combined characters" do
      expect(Confusable.internal_skeleton("admin")).to eq("adrnin")
    end

    it "removes default ignorable code points" do
      # ZERO WIDTH NON-JOINER, U+200C
      expect(Confusable.internal_skeleton("𝅳\u200c")).to eq("")
    end
  end

  context "in confusable check" do
    it "classifies two words with a cyrillic/latin difference as confusable" do
      expect(Confusable.confusable?("SupРort", "Support")).to be_truthy
    end

    it "removes punctuations" do
      expect(Confusable.confusable?("Sup.port", "Support")).to be_truthy
    end

    it "removes blank characters" do
      expect(Confusable.confusable?("Sup port", "Support")).to be_truthy
    end

    it "removes dialectics" do
      expect(Confusable.confusable?("Suppört", "Support")).to be_truthy
    end

    context "uppercase/lowercase issues" do
      it "both I and i resolves to l" do
        expect(Confusable.confusable?("I", "i")).to be_truthy
      end

      it "m resolves to rn" do
        expect(Confusable.confusable?("m", "rn")).to be_truthy
      end

      it "I resolves to l" do
        expect(Confusable.confusable?("I", "l")).to be_truthy
      end

      it "i resolves to L" do
        expect(Confusable.confusable?("i", "L")).to be_truthy
      end
    end
  end
end
