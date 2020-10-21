const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 10 - 15 minutes.</p>
    <ul>
        ${order
          .map(
            (item) => `<li>
            <img src="${item.thumbnail}" alt="${item.name}" />
            ${item.size} ${item.name} - ${item.price}
        </li>`
          )
          .join('')}
    </ul>
    <p>Your order total is <strong>${total}</strong> due at pickup</p>
    <style>
        ul {
            list-style: none;
        }
    </style>
    </div>`;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

exports.handler = async (event, context) => {
  //   await wait(2000); // used during testing loading state
  const body = JSON.parse(event.body);
  // check if the honeypot field was filled in
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Boop beed bop zzzzstt goodbye ERR 34234`,
      }),
    };
  }

  // validate data coming in
  const requiredFields = ['email', 'name', 'order'];
  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure there are items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Which of our yummy pizzas do you want?`,
      }),
    };
  }

  // send email
  const info = await transporter.sendMail({
    from: "Slick's slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  // send the success or err msg
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};

// TODO vid 41 10:00
