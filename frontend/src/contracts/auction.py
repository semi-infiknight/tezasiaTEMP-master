# KT1SKxiNGRD3ziaQVDwxZnpYJcDLuhmhfRa8
import smartpy as sp

class Auction(sp.Contract):

    # Constructor
    def __init__(self):
        #storage
        self.init(bidders = sp.big_map(tkey = sp.TAddress, tvalue = sp.TMutez))

    @sp.entry_point
    def make_bid (self):
        # assertions
        sp.verify(sp.amount > sp.tez(0))
        self.data.bidders[sp.sender] = sp.amount

    @sp.entry_point
    def return_money(self, params):
        sp.set_type(params,sp.TAddress)
        sp.send(params, self.data.bidders[params])
        self.data.bidders[params] = sp.tez(0)

@sp.add_test(name = "Auction test")
def test():

    scenario = sp.test_scenario()
    auction = Auction()
    scenario += auction

    a1 = sp.test_account("a1")
    a2 = sp.test_account("a2")
    a3 = sp.test_account("a3")

    scenario += auction.make_bid().run(sender = a1, amount = sp.tez(2))
    scenario.verify(auction.balance == sp.tez(2))
    scenario.verify(auction.data.bidders[a1.address] == sp.tez(2))
    scenario += auction.return_money(a1.address)
    scenario.verify(auction.data.bidders[a1.address] == sp.tez(0))

    scenario += auction.make_bid().run(sender = a1, amount = sp.tez(2))
    scenario += auction.make_bid().run(sender = a2, amount = sp.tez(3))
    scenario.verify(auction.balance == sp.tez(5))
    scenario.verify(auction.data.bidders[a1.address] == sp.tez(2))
    scenario.verify(auction.data.bidders[a2.address] == sp.tez(3))
    scenario += auction.return_money(a1.address)
    scenario.verify(auction.balance == sp.tez(3))
    scenario += auction.return_money(a2.address)
    scenario.verify(auction.balance == sp.tez(0))