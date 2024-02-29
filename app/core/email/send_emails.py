import os
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from ..recommendations.hybrid import hybrid_recommendations
from ..models import User


def send_emails(user: User):
    # update recommendations
    hybrid_recommendations(user.id)
    recommendations = user.recommendations.all()[:5]

    for i, recommendation in enumerate(recommendations):
        print("Recommendation %d: %s" % (i + 1, recommendation.title))

    # Render the HTML content from template
    html_content = render_to_string('core/daily_digest_email.html', {
        'recommendations': recommendations
    })

    print("Sending email to ", user.email)

    message = Mail(
        from_email='feedmeuwaterloo@gmail.com',
        to_emails=[user.email],
        subject='Your FeedMe Daily News Digest',
        html_content=html_content)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print("Email sent")
    except Exception as e:
        print(str(e))
