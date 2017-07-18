var expect = chai.expect;
var  assert = chai.assert;


describe('Radio', function () {
    describe('property:topics', function () {
        it('should be an object', function () {
            expect(radio.topics).to.be.an.instanceof(Object);
        });
        it('should be empty', function () {
            expect(radio.topics).to.be.empty;
        })
    });
    describe('method:on', function () {
        it('should be a function', function () {
            expect(radio.on).to.be.an.instanceOf(Function)
        });
        it('should add topics if it does not exist', function () {
            radio.topics = {};
            var callback = function () {
            };
            radio.on('test', callback);
            expect(radio.topics).to.deep.equal({test: [callback]});
        });
        it('should add listener to existing topic', function () {
            var listenerOne = function () {
            };
            var listenerTwo = function () {
            };
            radio.topics={test: [listenerOne]};
            radio.on('test', listenerTwo);
            expect(radio.topics).to.deep.include({test: [listenerOne, listenerTwo]})
        });
    });
    describe('method:trigger', function () {
        it('should be a function', function () {
            expect(radio.trigger).to.be.an.instanceOf(Function);
        })
    });
    describe('method:once', function () {
        it('should be a function', function () {
            expect(radio.once).to.be.an.instanceOf(Function);
        });
        it('should call off', function () {
            var listenerThree = function () {
            };
            var spyRadioOff= sinon.spy(radio, 'off');
            radio.once('test', listenerThree);
            radio.trigger('test');
            sinon.assert.calledOnce(spyRadioOff);
        })
    })
});