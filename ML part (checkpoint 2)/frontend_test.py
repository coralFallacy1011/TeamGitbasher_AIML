import streamlit as st
import random

def generate_random_text():
    """Generates a random text string."""
    return "This is a random text card: " + str(random.randint(1, 100))

def display_card(text):
    """Displays a card with the given text."""
    st.card(text, on_click=lambda: on_card_click(text))

def on_card_click(text):
    """Handles card clicks, currently just prints the clicked text."""
    st.write(f"Card clicked: {text}")

def main():
    st.title("Swipe Cards")

    # Generate three random text cards
    cards = [generate_random_text() for _ in range(3)]

    # Display the cards
    for card in cards:
        display_card(card)

if __name__ == "__main__":
    main()