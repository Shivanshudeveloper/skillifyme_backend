const User_Model = require('../../models/User');

require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const { APP_URL } = require("../../config/config");

const endpointSecret = process.env.STRIPE_WEBHOOK;

// Create User Checkout Session
const createCheckoutSession = async (req, res) => {
    try {
        const { customerId, priceId } = req.body;

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${APP_URL}/dashboard/app`,
            cancel_url: `${APP_URL}/plan`,
        });
        
        res.status(200).send({ sessionId: session.id });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}


// Create User Checkout Session
const checkSubscriptionStatus = async (req, res) => {
    try {
        const { customerId } = req.params;

        User_Model.findOne({ customerId })
            .then(async (data) => {
                const subscriptionId = data?.subscriptionId;
                const alertSeen = data?.alertSeen;
                // Check Subsription Status
                const subscriptionUser = await stripe.subscriptions.retrieve(subscriptionId);
                var data = {
                    status: subscriptionUser.status,
                    current_period_end: subscriptionUser.current_period_end,
                    alertSeen
                }
                res.status(200).json({ status: true, data });
            })
            .catch((err) => console.log(err));
        
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

// Create User Checkout Session
const alertSeen = async (req, res) => {
    try {
        const { customerId } = req.params;

        User_Model.updateOne({ customerId }, { $set: {alertSeen: true } })
            .then((data) => {
                res.status(200).json({ status: true, data });
            })
            .catch((err) => console.log(err));
        
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
}

module.exports = {
    createCheckoutSession,
    checkSubscriptionStatus,
    alertSeen
}