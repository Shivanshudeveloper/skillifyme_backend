const https = require('https');

require('dotenv').config();

const checkSpamEmailList = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { email } = req.body;
  
    try {
        // Check if the email is an empty string
        if (email.trim() === '') {
            var data = {
                email,
                isValid: false
            }
            res.status(200).json({ status: true, data });
            return false;
        } else {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                var data = {
                    email,
                    isValid: false
                }
                res.status(200).json({ status: true, data });
                return false;
            } else {
                console.log(email);

                const spamDomains = await fetch('https://gist.githubusercontent.com/Shivanshudeveloper/b27d6f653d5b898568a8af7802f8d3e9/raw/6848a54644036a93542974e8bd8e4307c70e8df5/spamdomain.txt')
                const forbiddenEmailList = await spamDomains.text();
                const forbiddenEmails = forbiddenEmailList.split('\n');

                const domainPart = email.split('@')[1];

                const isForbidden = forbiddenEmails.some((e) => {
                    if (!e.length) {
                        return false;
                    }

                    if (e.trim().toLowerCase() === domainPart.trim().toLowerCase()) {
                        return true;
                    }
                })

                if (isForbidden) {
                    var data = {
                        email,
                        isValid: false
                    }
                    res.status(200).json({ status: true, data });
                } else {
                    var data = {
                        email,
                        isValid: true
                    }
                    res.status(200).json({ status: true, data });
                }
            }
        }

    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: false, data: "Error while creating Project" });
    }
};

const checkWebsite = async (req, res) => {
    res.setHeader("Content-Type", "application/json");
    var { domain } = req.body;
  
    try {

        if (domain.startsWith('http://')) {
            var data = {
                domain,
                data: "http is not supported",
            }
            res.status(200).json({ status: true, data });
        } else {
            if (!domain.startsWith('https://')) {
                // Append "https://" to the URL
                domain = 'https://' + domain;
            }
            // Make an HTTP GET request to the website
            https.get(domain, (response) => {
                const statusCode = response.statusCode;

                if (statusCode >= 200 && statusCode < 400) {
                    var data = {
                        domain,
                        isValid: true,
                        ssl: "found"
                    }
                    res.status(200).json({ status: true, data });
                } else {
                    var data = {
                        domain,
                        isValid: false,
                        ssl: "not found"
                    }
                    res.status(200).json({ status: true, data });
                }
            }).on('error', (error) => {
                // An error occurred during the request
                if (error.code === 'ECONNREFUSED') {
                    var data = {
                        domain,
                        isValid: false,
                        ssl: "not found"
                    }
                    res.status(200).json({ status: true, data });
                } else {
                    var data = {
                        domain,
                        isValid: false,
                        ssl: "not found"
                    }
                    res.status(200).json({ status: true, data });
                }

                



            });
        }





        

    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: false, data: "Something went wrong!" });
    }
};

module.exports = {
    checkSpamEmailList,
    checkWebsite
}
